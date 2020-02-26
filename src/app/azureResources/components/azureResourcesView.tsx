/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import * as d3 from 'd3';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import HeaderContainer from '../../shared/components/headerContainer';
import SettingsPaneContainer from '../../settings/components/settingsPaneContainer';
import { useAccount } from '../../login/hooks/useAccount';
import { Solution } from '../models/solution';
import { Group } from '../models/group';
import { Resource } from '../models/resource';
import { Link, LinkType } from '../models/link';
import '../../css/resources/_entry.scss';

export enum ViewType {
    architect,
    operator,
    finance
}
export const AzureResourcesView: React.FC = props => {
    const { accountName, login } = useAccount();
    const [ viewType, setViewType ] = React.useState<ViewType>(ViewType.architect);
    const d3Container = React.useRef();
    const viewWidth = 1000;  // tslint:disable-line:no-magic-numbers
    const viewHeight = 700;  // tslint:disable-line:no-magic-numbers

    const dataSet: Solution = {
        groups: [
            {
                nameKey: 'Device Provisioning',
                resources: [
                    {
                        architectLocation: 'West Central US',
                        architectMessage: '200 Enrollments',
                        financeKPI: 'green',
                        financeKPIMessage: 'Avg $0.00/month',
                        name: 'dps1',
                        operatorKPI: 'yellow',
                        operatorKPIMessage: 'Certificate expiring soon',
                        type: 'dps'
                    }
                ]
            },
            {
                nameKey: 'IoT Hubs',
                resources: [
                    {
                        architectLocation: 'West US',
                        architectMessage: 'S2 | 1 unit | 6,000,000 Messages',
                        financeKPI: 'green',
                        financeKPIMessage: 'Avg $1000.00/month',
                        name: 'microwaves',
                        operatorKPI: 'green',
                        operatorKPIMessage: 'Operating within expected parameters.',
                        type: 'iot'
                    },
                    {
                        architectLocation: 'West US',
                        architectMessage: 'S1 | 10 units | 400,000 Messages',
                        financeKPI: 'green',
                        financeKPIMessage: 'Avg $1000.00/month',
                        name: 'sector_7G',
                        operatorKPI: 'red',
                        operatorKPIMessage: 'Daily message quota exceeded.',
                        type: 'iot',
                    }
                ]
            },
            {
                nameKey: 'Endpoints',
                resources: [
                    {
                        architectLocation: 'West US',
                        architectMessage: 'Classic',
                        financeKPI: 'green',
                        financeKPIMessage: 'Avg $100.00/month',
                        name: 'storage_account',
                        operatorKPI: 'green',
                        operatorKPIMessage: 'Operating within expected parameters.',
                        type: 'endpoint'
                    },
                    {
                        architectLocation: 'East US',
                        architectMessage: 'Edge Devices',
                        financeKPI: 'yellow',
                        financeKPIMessage: 'Exceeds average by $150.00 per month',
                        name: 'eventGrid1',
                        operatorKPI: 'green',
                        operatorKPIMessage: 'Operating within expected parameters.',
                        type: 'endpoint'
                    },
                    {
                        architectLocation: 'East US',
                        architectMessage: 'Max 20 Consumer Groups | 1000 Brokered Connections',
                        financeKPI: 'green',
                        financeKPIMessage: 'Avg $100.00/month',
                        name: 'eventHub7alpha',
                        operatorKPI: 'green',
                        operatorKPIMessage: 'Operating within expected parameters.',
                        type: 'endpoint'
                    },
                    {
                        architectLocation: 'West Central US',
                        architectMessage: '1 Consumer Group | 100 Brokered Connections',
                        financeKPI: 'green',
                        financeKPIMessage: 'Avg $100.00/month',
                        name: 'affansEventHubThatWeStillUse',
                        operatorKPI: 'green',
                        operatorKPIMessage: 'Operating within expected parameters.',
                        type: 'endpoint'
                    }
                ]
            },
        ],
        links: [
            {
                end: 0,
                start: 0,
                text: 'connection',
                type: LinkType.dps
            },
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

    const generateFinancePivot = (d: Resource) => {
        return (
            `<div class='entry'>
                <div class='title'>${d.name}</div>
                <div class='message'>
                    <div class='kpi' style='background-color:${d.financeKPI}'></div>
                    <div class='kpi-message'>${d.financeKPIMessage}</div>
                </div>
            </div>`
        );
    };

    const generateArchitectPivot = (d: Resource) => {
        return (
            `<div class='entry'>
                <div class='title'>${d.name}</div>
                <div class='message'>${d.architectMessage}</div>
                <div class='message'>${d.architectLocation}</div>
            </div>`
        );
    };

    const generateOperationsPivot = (d: Resource) => {
        return (
            `<div class='entry'>
                <div class='title'>${d.name}</div>
                <div class='message'>
                    <div class='kpi' style='background-color:${d.operatorKPI}'></div>
                    <div class='kpi-message'>${d.operatorKPIMessage}</div>
                </div>
            </div>`
        );
    };

    React.useEffect(() => {
        if (!d3Container.current) {
            return;
        }

        // tslint:disable-next-line:no-console
        console.log('here we are');

        const svg = d3.select(d3Container.current);
        svg.selectAll().remove();

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
            .attr('stroke', '#D3D3D3' )
            .attr('fill', 'none')
            .attr('y', 20) // tslint:disable-line:no-magic-numbers
            .attr('stroke-width', 2) // tslint:disable-line:no-magic-numbers
            .attr('height', '90%'); // tslint:disable-line:no-magic-numbers

        // column headers
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
            .attr('fill', 'blue')
            .attr('height', '10')
            .attr('width', '10');

        entries.append('rect')
            .attr('x', '25')
            .attr('y', (d: Resource, i: number) => yScale(i.toString()))
            .attr('fill', '#D3D3D3')
            .transition()
                .ease(d3.easeBack)
                .duration(700) // tslint:disable-line:no-magic-numbers
                .attr('width', xScale.bandwidth() - 40) // tslint:disable-line:no-magic-numbers
                .attr('height', yScale.bandwidth() - 10); // tslint:disable-line:no-magic-numbers

        const contents = entries.append('foreignObject')
            .attr('x', '25')
            .attr('y', (d: Resource, i: number) => yScale(i.toString()))
            .attr('opacity', '0')
            .attr('width', xScale.bandwidth() - 40) // tslint:disable-line:no-magic-numbers
            .attr('height', yScale.bandwidth() - 10) // tslint:disable-line:no-magic-numbers
                .html((d: Resource, i: number) => {
                    // tslint:disable-next-line:no-console
                    console.log('allow me');
                    if (viewType === ViewType.architect) {
                        return generateArchitectPivot(d);
                    }

                    if (viewType === ViewType.operator) {
                        return generateOperationsPivot(d);
                    }

                    if (viewType === ViewType.finance) {
                        return generateFinancePivot(d);
                    }
                });

        contents.transition().style('opacity', '1').delay(800); // tslint:disable-line:no-magic-numbers

        const lines = svg.selectAll('.line')
        .data(dataSet.links)
            .enter()
            .append('line')

            .attr('x1', (d: Link) => {
                if (d.type === LinkType.dps) {
                    return xScale('Device Provisioning') + xScale.bandwidth() - 16; // tslint:disable-line:no-magic-numbers
                }

                return xScale('IoT Hubs') + xScale.bandwidth() - 16; // tslint:disable-line:no-magic-numbers
            })
            .attr('y1', (d: Link) => yScale(d.start.toString()) + 35) // tslint:disable-line:no-magic-numbers
            .attr('x2', (d: Link) => {
                if (d.type === LinkType.dps) {
                    return xScale('IoT Hubs') + 10; // tslint:disable-line:no-magic-numbers
                }

                return xScale('Endpoints') + 10; // tslint:disable-line:no-magic-numbers
            }) // tslint:disable-line:no-magic-numbers
            .attr('y2', (d: Link) => yScale(d.end.toString()) + 5) // tslint:disable-line:no-magic-numbers
            .transition()
            .ease(d3.easeBack)
            .delay(800) // tslint:disable-line:no-magic-numbers
                .attr('stroke', 'gray')
                .attr('stroke-width', '2');

        lines.text((d: Link) => d.text);
    }); // tslint:disable-line:align

    const onDropDownChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setViewType(ViewType.operator);
    };

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
                    <div>
                        <Dropdown
                            options={[
                                { key: 'architect', text: 'System View'},
                                { key: 'finance', text: 'Financial View'},
                                { key: 'operator', text: 'Operator View'}
                            ]}
                            onChange={onDropDownChange}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};
