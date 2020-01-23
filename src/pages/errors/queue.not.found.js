import React from 'react';
import { useHistory, withRouter } from "react-router-dom";

class QueueNotFound extends React.Component
{
        render(){
                return(
                <div>
                        <div>Queue not found.</div>
                </div>
                )}


}
export default withRouter(QueueNotFound);