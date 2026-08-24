import { useState,useEffect } from "react";
import api from "../../service/api";
import { Users, Search, Trash2, UserCheck, UserX } from "lucide-react";

const AdminUsers=()=>{

    const[users,setUsers]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");
    const[search,setSearch]=useState("");

    // get All users

    const getUsers=async()=>{
        try{
            const res=await api.get("/alluser")

            if(res.data.success){
                setUsers(res.data.users||[])
            }
        }catch(err){
            console.log(err);

            setError(
                err.response?.data?.message||"Failed to load users"
            )
            
        }finally{
            setLoading(false)
        }
    }


    // change user status

    const handleStatus=async(id,currentStatus)=>{
        try{
            const res=await api.patch(`/user/${id}`,{
                isActive:!currentStatus
            })

            if(res.data.success){
                setUsers(prev=>prev.map(user=>user._id===id?{
                    ...user,
                    isActive: !currentStatus
                }
                :user    
            ))
            }
        }catch(err){
            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to update user status"
            );
            
        }finally{

        }
    }

    // delete users

    const deleteUser=async(id)=>{
        const confirmDelete=window.confirm(
            "Are you sure you want to delete this user?"
        );

        if(!confirmDelete){
            return
        }

        try{
            const res=await api.delete(`/deleteuser/${id}`)

            if(res.data.success){
                setUsers(prev=>prev.filter(user=>user._id!==id))
            }
        }catch(err){
            console.log(err);

            alert(
                err.response?.data?.message||"Unable to delete user"
            )
            
        }
    }

    // search

    const filteredUsers=(users || []).filter(user=>{
        const searchValue=search.toLowerCase();

        return(
            user.name?.toLowerCase().includes(searchValue) ||
            user.email?.toLowerCase().includes(searchValue) ||
            user.role?.join(" ").toLowerCase().includes(searchValue)
        )

    })

    useEffect(()=>{
        getUsers()
    },[])

    
         return (
        <div className="admin-users-page">

            {/* HEADER */}

            <div className="admin-users-header">

                <div>
                    <h1>Users</h1>
                    <p>Manage all users registered on the platform</p>
                </div>

                <div className="admin-users-count">
                    <Users size={20} />
                    <span>{users?.length || 0} Users</span>
                </div>

            </div>


            {/* SEARCH */}

            <div className="admin-users-toolbar">

                <div className="admin-users-search">

                    <Search size={19} />

                    <input
                        type="text"
                        placeholder="Search by name, email or role..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* ERROR */}

            {error && (
                <div className="admin-users-error">
                    {error}
                </div>
            )}


            {/* LOADING */}

            {loading ? (

                <div className="admin-users-loading">
                    Loading users...
                </div>

            ) : (

                <div className="admin-users-table-wrapper">

                    <table className="admin-users-table">

                        <thead>

                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredUsers.length > 0 ? (

                                filteredUsers.map(user => (

                                    <tr key={user._id}>

                                        {/* NAME */}

                                        <td>
                                            <div className="admin-user-name">

                                                <div className="admin-user-avatar">
                                                    {user.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <span>
                                                    {user.name}
                                                </span>

                                            </div>
                                        </td>


                                        {/* EMAIL */}

                                        <td>
                                            {user.email}
                                        </td>


                                        {/* ROLE */}

                                        <td>

                                            <div className="admin-role-list">

                                                {user.role?.map(
                                                    (role, index) => (

                                                        <span
                                                            key={index}
                                                            className={`admin-role ${role}`}
                                                        >
                                                            {role}
                                                        </span>

                                                    )
                                                )}

                                            </div>

                                        </td>


                                        {/* PHONE */}

                                        <td>
                                            {user.phone || "—"}
                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={
                                                    user.isActive
                                                        ? "admin-status active"
                                                        : "admin-status inactive"
                                                }
                                            >
                                                {user.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="admin-user-actions">

                                                <button
                                                    className={
                                                        user.isActive
                                                            ? "admin-action-btn deactivate"
                                                            : "admin-action-btn activate"
                                                    }
                                                    title={
                                                        user.isActive
                                                            ? "Deactivate User"
                                                            : "Activate User"
                                                    }
                                                    onClick={() =>
                                                        handleStatus(
                                                            user._id,
                                                            user.isActive
                                                        )
                                                    }
                                                >

                                                    {user.isActive
                                                        ? <UserX size={17} />
                                                        : <UserCheck size={17} />
                                                    }

                                                </button>


                                                <button
                                                    className="admin-action-btn delete"
                                                    title="Delete User"
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="admin-no-users"
                                    >
                                        No users found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
    
}

export default AdminUsers