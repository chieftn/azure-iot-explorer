/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import * as d3 from 'd3';
import HeaderContainer from '../../shared/components/headerContainer';
import SettingsPaneContainer from '../../settings/components/settingsPaneContainer';
import { useAccount } from '../../login/hooks/useAccount';
import { Solution } from '../models/solution';
import { Group } from '../models/group';
import { Resource } from '../models/resource';
import { Link, LinkType } from '../models/link';

export const AzureResourcesView: React.FC = props => {
    const { accountName, login } = useAccount();
    const d3Container = React.useRef();
    const viewWidth = 1000;  // tslint:disable-line:no-magic-numbers
    const viewHeight = 600;  // tslint:disable-line:no-magic-numbers

    const dataSet: Solution = {
        groups: [
            {
                nameKey: 'Device Provisioning',
                resources: [
                    {
                        name: 'dps1',
                        type: 'dps'
                    }
                ]
            },
            {
                nameKey: 'IoT Hubs',
                resources: [
                    {
                        name: 'iot hub 1',
                        type: 'iot'
                    },
                    {
                        name: 'iot hub 2',
                        type: 'iot'
                    }
                ]
            },
            {
                nameKey: 'Endpoints',
                resources: [
                    {
                        name: 'endpoint 1',
                        type: 'endpoint'
                    },
                    {
                        name: 'endpoint 2',
                        type: 'endpoint'
                    },
                    {
                        name: 'endpoint 3',
                        type: 'endpoint'
                    },
                    {
                        name: 'endpoint 4',
                        type: 'endpoint'
                    }
                ]
            },
        ],
        links: [
            {
                end: 1,
                start: 0,
                text: 'connection',
                type: LinkType.dps
            },
            {
                end: 0,
                start: 0,
                text: 'My cool route',
                type: LinkType.route
            },
            {
                end: 1,
                start: 1,
                text: 'My cool route 2',
                type: LinkType.route
            },
            {
                end: 3,
                start: 1,
                text: 'My cool route 3',
                type: LinkType.route
            }
        ]
    };

    if (!accountName) {
        login();
        return;
    }

    React.useEffect(() => {
        if (!d3Container.current) {
            return;
        }
        const svg = d3.select(d3Container.current);
        const xScale = d3.scaleBand()
            .domain(dataSet.groups.map(s => s.nameKey))
            .rangeRound([0, viewWidth])
            .padding(0.1); // tslint:disable-line:no-magic-numbers

        // hacky y-scale assuming max of five entries.
        const yScale = d3.scaleBand()
            .domain(d3.range(5).map(s => s.toString())) // tslint:disable-line:no-magic-numbers
            .rangeRound([20, viewHeight]) // tslint:disable-line:no-magic-numbers
            .padding(0.1); // tslint:disable-line:no-magic-numbers

        const groups = svg.selectAll('g')
            .data(dataSet.groups)
            .enter()
                .append('g')
                .attr('transform', (d: Group, i: number) => `translate(${xScale(d.nameKey)},0)`);

        groups
            .append('rect')
            .attr('width', xScale.bandwidth())
            .attr('stroke', 'gray' )
            .attr('fill', 'none')
            .attr('y', 20) // tslint:disable-line:no-magic-numbers
            .attr('stroke-width', 2) // tslint:disable-line:no-magic-numbers
            .attr('height', '90%'); // tslint:disable-line:no-magic-numbers

        const text = svg.selectAll('.desc')
            .data(dataSet.groups)
            .enter()
            .append('text')
            .text((d: Group) => d.nameKey)
            .attr('y', 10) // tslint:disable-line:no-magic-numbers
            .attr('transform', (d: Group, i: number) => `translate(${xScale(d.nameKey)},0)`);

        const entries = groups
            .selectAll('g')
            .data((d: Group) => d.resources)
                .enter()
                .append('g');

        entries.append('rect')
            .attr('x', '10')
            .attr('y', (d: Resource, i: number) => yScale(i.toString()))
            .attr('fill', 'red')
            .attr('height', '10')
            .attr('width', '10');

        entries.append('rect')
            .attr('x', '25')
            .attr('y', (d: Resource, i: number) => yScale(i.toString()))
            .attr('fill', 'blue')
            .attr('height', '10')
            .attr('width', '10');

        // const lineFunction = d3.line<Link>()
        //     // tslint:disable-next-line:no-any
        //     .x((d: Link, i: number) => {
        //         return xScale(d.start.toString())

        //     })
        //     // tslint:disable-next-line:no-any
        //     .y((d: Link, i: number) => {
        //         return yScale(d.start.toString());
        //     });

        const lines = svg.selectAll('.line')
        .data(dataSet.links)
            .enter()
            .append('line')
            .attr('x1', (d: Link) => {
                if (d.type === LinkType.dps) {
                    return xScale('Device Provisioning') + 30; // tslint:disable-line:no-magic-numbers
                }

                return xScale('IoT Hubs') + 30; // tslint:disable-line:no-magic-numbers
            })
            .attr('y1', (d: Link) => yScale(d.start.toString()) + 5) // tslint:disable-line:no-magic-numbers
            .attr('x2', (d: Link) => {
                if (d.type === LinkType.dps) {
                    return xScale('IoT Hubs') + 10; // tslint:disable-line:no-magic-numbers
                }

                return xScale('Endpoints') + 10; // tslint:disable-line:no-magic-numbers
            }) // tslint:disable-line:no-magic-numbers
            .attr('y2', (d: Link) => yScale(d.end.toString()) + 5) // tslint:disable-line:no-magic-numbers
            .attr('stroke', 'black')
            .attr('stroke-width', '2');

            // .datum(dataSet.links)
            // .attr('d', lineFunction);

    }, []); // tslint:disable-line:align

    return (
        <div className="app">
            <HeaderContainer />
            <div className="content">
                <SettingsPaneContainer />
                <main role="main">
                    <div style={{marginTop: 10}}>
                        <svg
                            width={viewWidth}
                            height={viewHeight}
                            ref={d3Container}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};
