/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { LocalizationContextConsumer, LocalizationContextInterface } from '../../shared/contexts/localizationContext';
import { ResourceKeys } from '../../../localization/resourceKeys';
import RepositoryLocationList from './repositoryLocationList';
import { REPOSITORY_LOCATION_TYPE } from '../../constants/repositoryLocationTypes';
import { ConfirmationDialog } from './confirmationDialog';
import { ThemeContextConsumer, ThemeContextInterface, Theme } from '../../shared/contexts/themeContext';
import { THEME_SELECTION } from '../../constants/browserStorage';
import { Notification } from '../../api/models/notification';
import { RepositoryLocationSettings } from '../state';
import { getConnectionInfoFromConnectionString } from '../../api/shared/utils';
import { ROUTE_PARTS } from '../../constants/routes';
import '../../css/_settingsPane.scss';

export interface SettingsPaneProps extends Settings {
    isOpen: boolean;
}

export interface SettingsPaneActions {
    onSettingsSave: (payload: Settings) => void;
    onSettingsVisibleChanged: (visible: boolean) => void;
    addNotification: (notification: Notification) => void;
    refreshDevices: () => void;
}

export interface Settings {
    hubConnectionString: string;
    repositoryLocationSettings?: RepositoryLocationSettings[];
}

interface SettingsPaneState extends Settings{
    isDarkTheme: boolean;
    isDirty: boolean;
    showConfirmationDialog: boolean;
}

export default class SettingsPane extends React.Component<SettingsPaneProps & SettingsPaneActions & RouteComponentProps, SettingsPaneState> {
    constructor(props: SettingsPaneProps & SettingsPaneActions & RouteComponentProps) {
        super(props);
        const repositoryLocationSettings: RepositoryLocationSettings[] = props.repositoryLocationSettings ? props.repositoryLocationSettings.map(setting => {
            return {
                repositoryLocationType: setting.repositoryLocationType,
                value: setting.value};
            }) : [];
        const theme = localStorage.getItem(THEME_SELECTION);

        this.state = {
            hubConnectionString: props.hubConnectionString,
            isDarkTheme: Theme.dark === theme || Theme.highContrastBlack === theme,
            isDirty: false,
            repositoryLocationSettings,
            showConfirmationDialog: false,
        };
    }

    public render(): JSX.Element {
        return (
            <LocalizationContextConsumer>
                {(context: LocalizationContextInterface) => (
                    <Panel
                        className="settingsPane"
                        role="dialog"
                        isOpen={this.props.isOpen}
                        onDismiss={this.dismissPane}
                        type={PanelType.medium}
                        isFooterAtBottom={true}
                        onRenderFooter={this.settingsFooter}
                        closeButtonAriaLabel={context.t(ResourceKeys.common.close)}
                    >
                        <header className="panel-header">
                            <h2>{context.t(ResourceKeys.settings.headerText)}</h2>
                        </header>
                        <section aria-label={context.t(ResourceKeys.settings.configuration.headerText)}>
                            <h3 role="heading" aria-level={1}>{context.t(ResourceKeys.settings.configuration.headerText)}</h3>
                            <Link onClick={this.onNavigateHome}>{context.t(ResourceKeys.settings.configuration.redirect)}</Link>
                        </section>
                        <section aria-label={context.t(ResourceKeys.settings.modelDefinitions.headerText)}>
                            <h3 role="heading" aria-level={1}>{context.t(ResourceKeys.settings.modelDefinitions.headerText)}</h3>
                            <span className="helptext">{context.t(ResourceKeys.settings.modelDefinitions.helpText)}</span>
                            <RepositoryLocationList
                                items={this.state.repositoryLocationSettings}
                                onAddListItem={this.onAddListItem}
                                onMoveItem={this.onMoveRepositoryLocation}
                                onLocalFolderPathChanged={this.onLocalFolderPathChanged}
                                onRemoveListItem={this.onRemoveListItem}
                            />
                        </section>
                        <section aria-label={context.t(ResourceKeys.settings.theme.headerText)}>
                            <h3 role="heading" aria-level={1}>{context.t(ResourceKeys.settings.theme.headerText)}</h3>
                            <Toggle
                                onText={context.t(ResourceKeys.settings.theme.darkTheme)}
                                offText={context.t(ResourceKeys.settings.theme.lightTheme)}
                                onChange={this.setTheme}
                                checked={this.state.isDarkTheme}
                            />
                        </section>
                        {this.renderConfirmationDialog(context)}
                    </Panel>
                )}
            </LocalizationContextConsumer>
        );
    }

    private readonly setTheme = (ev: React.MouseEvent<HTMLElement>, isDarkTheme: boolean) => {
        this.setState({
            isDarkTheme,
            isDirty: true,
        });
    }

    private readonly renderConfirmationDialog = (context: LocalizationContextInterface) => {
        if (this.state.isDirty && this.state.showConfirmationDialog) {
            return (
                <ConfirmationDialog
                    t={context.t}
                    messageKey={ResourceKeys.settings.confirmationMessage}
                    onYes={this.onDialogConfirmCancel}
                    onNo={this.closeDialog}
                />
            );
        }
    }

    private readonly onNavigateHome = () => {
        this.props.onSettingsVisibleChanged(false);
        this.props.history.push(`/${ROUTE_PARTS.RESOURCE}/`);
    }

    private readonly onAddListItem = (type: REPOSITORY_LOCATION_TYPE) => {
        const items = this.state.repositoryLocationSettings;
        items.push({
            repositoryLocationType: type
        });
        this.setState({
            isDirty: true,
            repositoryLocationSettings: [...items]
        });
    }

    private readonly onRemoveListItem = (index: number) => {
        const items = this.state.repositoryLocationSettings;
        items.splice(index, 1);
        this.setState({
            isDirty: true,
            repositoryLocationSettings: [...items]
        });
    }

    private readonly onLocalFolderPathChanged = (path: string) => {
        const items = this.state.repositoryLocationSettings;
        const item = items[items.findIndex(value => value.repositoryLocationType === REPOSITORY_LOCATION_TYPE.Local)];
        item.value = path;
        this.setState({
            isDirty: true,
            repositoryLocationSettings: [...items]
        });
    }

    private readonly onMoveRepositoryLocation = (oldIndex: number, newIndex: number) => {
        const items = this.state.repositoryLocationSettings;
        items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
        this.setState({
            isDirty: true,
            repositoryLocationSettings: [...items]
        });
    }

    private readonly dismissPane = (event?: React.SyntheticEvent<HTMLElement, Event>) => {
        event.preventDefault();
        if (this.state.isDirty) {
            this.revertState();
        }
        this.props.onSettingsVisibleChanged(false);
    }

    private readonly closePane = () => {
        if (this.state.isDirty) {
            this.showDialog();
        }
        else {
            this.props.onSettingsVisibleChanged(false);
        }
    }

    private readonly onDialogConfirmCancel = (): void => {
        this.revertState();
        this.props.onSettingsVisibleChanged(false);
    }

    private readonly revertState = (): void => {
        this.setState({
            isDirty: false,
            repositoryLocationSettings: [...(this.props.repositoryLocationSettings && this.props.repositoryLocationSettings.map(setting => {
                return {
                    repositoryLocationType: setting.repositoryLocationType,
                    value: setting.value
                };
            }))],
            showConfirmationDialog: false
        });
    }

    private readonly showDialog = (): void => {
        this.setState({ showConfirmationDialog: true });
    }

    private readonly closeDialog = (): void => {
        this.setState({ showConfirmationDialog: false });
    }

    private readonly saveSettings = () => {
        const settings = {...this.state};

        this.props.onSettingsSave(settings);
        this.setState({
            isDirty: false
        });
        this.props.onSettingsVisibleChanged(false);

        if (!this.state.hubConnectionString) {
            return;
        }

        const { hostName } = getConnectionInfoFromConnectionString(this.state.hubConnectionString);
        const targetPath = `/${ROUTE_PARTS.RESOURCE}/${hostName}/${ROUTE_PARTS.DEVICES}`;
        if (this.props.location.pathname !== targetPath) {
            this.props.history.push(targetPath);
        }

        this.props.refreshDevices();
    }

    private readonly settingsFooter = () => {
        return (
        <LocalizationContextConsumer>
            {(context: LocalizationContextInterface) => (
                <footer className="settings-footer">
                    <section aria-label={context.t(ResourceKeys.settings.questions.headerText)}>
                        <h3 role="heading" aria-level={1}>{context.t(ResourceKeys.settings.questions.headerText)}</h3>
                        <ul className="faq">
                            <li className="faq-item">
                                <Link
                                    href={context.t(ResourceKeys.settings.questions.questions.documentation.link)}
                                    target="_blank"
                                >{context.t(ResourceKeys.settings.questions.questions.documentation.text)}
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="footer-buttons">
                        <h3 role="heading" aria-level={1}>{context.t(ResourceKeys.settings.footerText)}</h3>
                        <ThemeContextConsumer>
                            {(themeContext: ThemeContextInterface) => (
                                <PrimaryButton
                                    type="submit"
                                    disabled={this.disableSaveButton()}
                                    text={context.t(ResourceKeys.settings.save)}
                                    // tslint:disable-next-line: jsx-no-lambda
                                    onClick={() => {
                                            themeContext.updateTheme(this.state.isDarkTheme);
                                            this.saveSettings();
                                        }
                                    }
                                />
                            )}
                        </ThemeContextConsumer>
                        <DefaultButton
                            type="reset"
                            text={context.t(ResourceKeys.settings.cancel)}
                            onClick={this.closePane}
                        />
                    </section>
                </footer>
            )}
            </LocalizationContextConsumer>
        );
    }

    private readonly disableSaveButton = () => {
        // 1. check dirty and hub connection string
        let shouldBeDisabled = !this.state.isDirty;

        // 3. check if local file explorer has been added along with it's path
        const localLocationSetting = this.state.repositoryLocationSettings.filter(location => location.repositoryLocationType === REPOSITORY_LOCATION_TYPE.Local);
        if (localLocationSetting && localLocationSetting.length !== 0  ) {
            shouldBeDisabled = shouldBeDisabled || !localLocationSetting[0].value;
        }
        return shouldBeDisabled;
    }
}
