import React from 'react';
import { useHistory, withRouter } from "react-router-dom";

class SignalrNotConnected extends React.Component
{
        render(){
                return(
                <div>
                        <div>Error: Failed to complete negotiation with the server</div>
                </div>
                )}


}
export default withRouter(SignalrNotConnected);