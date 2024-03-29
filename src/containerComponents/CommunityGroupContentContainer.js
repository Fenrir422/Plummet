import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import CommunityGroupContent from '../components/page-holder/Communities/CommunityGroups/CommutyGroupsContent/CommunityGroupContent'
import {setCommunityMembersThunk,} from '../reducers/usersReducer'



class ClassCommutyGroupContent extends React.Component  {
  
    componentDidMount () {
        this.props.getMembers(40, 1);
    }

    render(){
        return <div>
            <CommunityGroupContent  props={this.props}
                                    sortedGroupMembers={this.props.sortedGroupMembers}
                                    communityMembers={this.props.communityMembers}
                                    />
        </div>
    }
}

let mapStateToProps =(store)=>{
    return {
        CommunityGroup: store.communityStore.CommunityGroups,
        communityMembers: store.usersStore.communityMembers,
        sortedGroupMembers: store.usersStore.sortedMembers
    }
}

let CommunityGroupContentWithURL = withRouter(ClassCommutyGroupContent);
let CommunityGroupContentContainer = connect (mapStateToProps, {getMembers: setCommunityMembersThunk}) (CommunityGroupContentWithURL);


export default CommunityGroupContentContainer;