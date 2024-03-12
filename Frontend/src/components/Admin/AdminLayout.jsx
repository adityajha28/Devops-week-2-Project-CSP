import { Button, Flex } from 'monday-ui-react-core'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import CreateProject from '../CreateProject'

function AdminLayout() {
    return (
        <>
            <Flex>
                <div style={{ margin: "2px " }}>
                    <Link to='escalationmatrix'>Escaltion Matrix</Link>
                </div>
                <div style={{ margin: "2px" }}>
                    <Link to='phasemilestone'>Phase Milestone</Link>
                </div>
                <div style={{ margin: "2px" }}>
                    <Link to='overview'>Project Overview</Link>
                </div>
                <div style={{ margin: "2px" }}>
                    <Link to='riskprofile'>Risk Profiling</Link>
                </div>
                <div style={{ margin: "2px " }}>
                    <Link to=''></Link>
                </div>
            </Flex>

            <div>
                
                <Outlet />
            </div>
        </>
    )
}

export default AdminLayout