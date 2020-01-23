import React from 'react';
import { useHistory, withRouter } from "react-router-dom";

class ExceptionSignalR extends React.Component
{
        render(){
                return(
                <div>
                        <div>Exceprion from the server.</div>
                </div>
                )}


}
export default withRouter(ExceptionSignalR);