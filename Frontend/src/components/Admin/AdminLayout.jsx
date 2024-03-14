import { Box, BreadcrumbItem, BreadcrumbsBar, Button, Flex, Heading, Tab, TabList } from 'monday-ui-react-core'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import CreateProject from '../CreateProject'
import Api from '../Api';

function AdminLayout() {
    const [project, setProject] = useState();
    const location = useLocation();
    const { id } = useParams();
    const fetchProject = async () => {
        await Api.get(`/project/${id}`).then((e) => {
            
            setProject(e.data);
        })
            .catch((e) => {
                console.log("unable to get project");
            })
    }
    useEffect(() => {
        fetchProject();
    })
    return (
        <>
            <div className='m-2 p-2'>
                <BreadcrumbsBar type={BreadcrumbsBar.types.INDICATION}>
                    <BreadcrumbItem text='Project' />
                    {
                        location?.pathname?.split('/').map((e, index) => {
                            if (e.trim() == id) {
                                return (<BreadcrumbItem text={project?.name} />)
                            }
                            if (index >= 1) {
                                return (<BreadcrumbItem text={e} />
                                )
                            }
                        })
                    }
                </BreadcrumbsBar>

            </div>

            <h1 className='p-2 m-2 mt-4 text-2xl text-slate-900'>
                {project?.name}
            </h1>
            <div>
                <div className="flex flex-row" style={{ flexDirection: "row" }}>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='overview'>Project Overview</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='scopeandstack'>Scope And Stack</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='escalationmatrix'>Escalation Matrix</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='phasemilestone'>Phase Milestone</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='riskprofile'>Risk Profiling</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='stakeholders'>Stakeholders</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='sprintdetails'>Sprint Details</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='VersionHistory'>Version History</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='AuditHistory'>Audit History</Link>
                    </div>
                    <div className=" border-b-2 border-transparent hover:border-blue-500 ">
                        <Link to='clientfeedback'>Client Feedback</Link>
                    </div>
                </div>
            </div>


            <div className='m-2 border-t-2'>
                <Outlet />
            </div>
        </>
    )
}

export default AdminLayout