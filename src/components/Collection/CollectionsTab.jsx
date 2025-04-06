import React from 'react'
import { withRouter } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';

function CollectionsTab(props) {
    const navigateHome = () => {
        setTimeout(() => {props.history.push("/")}, 250)
    }
    return (
        <Tooltip title="Go Home" placement="bottom-start">
            <ListItem
                button
                onClick={navigateHome}
                style={{
                    background: '#fafafa',
                    padding: 20,
                    paddingLeft: 30,
                    marginBottom: 20,
                    minWidth: 'fit-content',
                    }}>
                <img 
                    style={{
                    height: 50,
                    width: 50,
                    marginRight: 10
                    }}
                    src="collection.png"
                    alt=""/>
                <h2 style={{
                    color: '#696969',
                    fontFamily: `'Noto Sans', sans-serif`,
                }}>
                    Collections:
                </h2>
            </ListItem>    
        </Tooltip>
    )
} 

export default withRouter(CollectionsTab)
