import React, { Component } from 'react';
import AltContainer from 'alt-container';
import TextTruncate from 'react-text-truncate';
import { translate, Trans } from 'react-i18next';
import RoleStore from '../../stores/RoleStore';
import RoleActions from '../../actions/RoleActions';
import SideBar from './SideBar';
import { NewPageHeader } from '../../containers/full/PageHeader';
import { DojotBtnLink } from '../../components/DojotButton';


function RoleCard(obj) {
    return (
        <div className="card-size card-hover lst-entry-wrapper z-depth-2 fullHeight">
            <div className="lst-entry-title col s12 ">
                <img className="title-icon" src="images/roles-icon.png" alt="Role" />
                <div className="title-text truncate" title={obj.group.name}>
                    <span className="text">
                        {obj.group.name}
                    </span>
                </div>
            </div>
            <div className="attr-list">
                <div className="attr-area light-background">
                    <div className="attr-row">
                        <div className="icon">
                            <img src="images/info-icon.png" alt={obj.group.description} />
                        </div>
                        <div className="user-card attr-content" title={obj.group.description}>
                            <TextTruncate
                                line={2}
                                truncateText="…"
                                text={obj.group.description}
                                containerClassName="description-text"
                            />
                            <div className="subtitle"><Trans i18nKey="roles.description" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

function RoleList(param) {
    console.log(param);
    if (param.groups) {
        const visible = true;
        const buttonsFooter = [
            {
                label: 'save',
                alt: 'clickToSave',
                click: param.hadleSave,
                color: 'red',
                modalConfirm: true,
                modalConfirmText: 'Ctz???',
            },
            {
                label: 'discard',
                alt: 'clickToSave',
                click: param.hadleSave,
                color: 'red',
                modalConfirm: true,
                modalConfirmText: 'Ctz???',
            },
        ];
        return (
            <div className="fill">
                <SideBar title={<Trans i18nKey="roles.change.title.new" />} visible={visible} buttonsFooter={buttonsFooter} />
                {param.groups.map(obj => <RoleCard group={obj} key={obj.id} />)}
            </div>);
    }
}


function OperationsHeader(param) {
    return (
        <div className="col s12 pull-right pt10">
            <DojotBtnLink
                responsive="true"
                onClick={param.newGroup}
                label={<Trans i18nKey="roles.btn.new.text" />}
                alt="Create a new role"
                icon="fa fa-plus"
                className="w130px"
            />
        </div>

    );
}

class Roles extends Component {
    constructor(props) {
        super(props);
        this.newGroup = this.newGroup.bind(this);
        this.state = {};
    }

    componentDidMount() {
        RoleActions.fetchGroups.defer();
    }

    componentWillUnmount() {

    }

    newGroup() {
        console.log('newGroup');
    }

    /*     newUser() {
            const tmp = this.state;
            tmp.createUser = true;
            this.setState(tmp);
            this.visibility(true, 'new');
        }
    
        visibility(bool, operation) {
            const tmp = this.state;
            if (operation !== 'new') tmp.createUser = false;
            tmp.visible = bool;
            this.setState(tmp);
        } */

    componentDidCatch(error, info) {
        console.log('componentDidCatch 1', error);
        console.log('componentDidCatch 2', info);
    }

    save() {
        console.log('Oi Mundo');
    }

    render() {
        return (
            <div id="roles-wrapper">
                <AltContainer store={RoleStore}>
                    <NewPageHeader title={<Trans i18nKey="roles.title" />} icon="roles">
                        <OperationsHeader newGroup={this.newGroup} />
                    </NewPageHeader>
                    <RoleList hadleSave={this.save} />
                </AltContainer>
            </div>
        );
    }
}


export default translate()(Roles);
