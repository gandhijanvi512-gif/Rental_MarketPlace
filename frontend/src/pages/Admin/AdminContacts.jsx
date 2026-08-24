import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../service/api"
import { useEffect } from "react"
import { SearchAlert } from "lucide-react"
import {
    Search,
    Eye,
    Trash2,
    Mail,
    MessageSquare,
    Clock,
    CheckCircle
} from "lucide-react";

const AdminContact=()=>{

    const navigate=useNavigate()

    const [contacts,setContacts]=useState([])
    const [search,setSearch]=useState("")
    const [statusFilter,setStatusFilter]=useState("all")
    const [sortBy,setSortBy]=useState("newest")
    const [loading,setLoading]=useState(true)


    const fetchContact=async()=>{
        try{
            setLoading(true)

            const res=await api.get("/admin/getallcontacts")

            setContacts(res.data.data || [])
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchContact()
    },[])

    // status count

    const totalMessages=contacts.length

    const newMessages=contacts.filter(contact=>contact.status==="new").length;
    const readMessages=contacts.filter(contact=>contact.status==="read").length;
    const resolvedMessages=contacts.filter(contact=>contact.status==="resolved").length;

    // search / status filter

    const filteredContacts=contacts.filter((contact)=>{
        const searchText=search.toLowerCase().trim()

        const matchesSearch=
            contact.name?.toLowerCase().includes(searchText)||
            contact.email?.toLowerCase().includes(searchText)||
            contact.subject?.toLowerCase().includes(searchText)||
            contact.category?.toLowerCase().includes(searchText)||
            contact.message?.toLowerCase().includes(searchText);
            
            const matchesStatus=statusFilter==="all" || contact.status===statusFilter

            return matchesSearch && matchesStatus

    })

                .sort((a,b)=>{
                if(sortBy==="newest"){
                    return new Date(b.createdAt)-new Date(a.createdAt)
                }

                if(sortBy==="oldest"){
                    return new Date(a.createdAt)-new Date(b.createdAt)
                }

                if(sortBy==="nameAZ"){
                    return (a.name || "").localeCompare(b.name || "")
                }

                if(sortBy==="nameZA"){
                    return (b.name || "").localeCompare(a.name || "")
                }

                return 0
            })


    // delete contact

    const handleDelete=async(id)=>{
        try{

            const confirmDelete=window.confirm(
                "Are you sure you want to delete this contact message?" 
            )

            if(!confirmDelete){
                return
            }

            const res=await api.delete(`/admin/deletecontact/${id}`)

            if(res.data.success){
                setContacts(prev=>prev.filter(
                    contact=>contact._id!==id
                ))
            }
        }catch(err){
            console.log(err);  
        }finally{
            setLoading(false)
        }
    }


    // chnage status

    // const handleStatusChange=async(id,newstatus)=>{
    //     try{
    //         const res=await api.patch(`/admin/updatecontactstatus/${id}/status`,
    //             {
    //                 status:newstatus
    //             }
    //         )

    //         if(res.data.success){
    //             setContacts(prev=>prev.map(contact=>contact._id===id?{
    //                 ...contact,
    //                 status:
    //                     res.data.data.status
    //             }:contact))
    //         }
    //     }catch(err){
    //         console.log(err);
            
    //     }
    // }

    // view contact

    const handleView=(id)=>{
        navigate(`/admin/getcontact/${id}`)
    }

    // status class

    const getStatusClass=(status)=>{
        switch(status){
            case "new":
                return "status-new"

            case "read":
                return "status-read"

            case "resolved":
                return "status-resolved"

            default:
                return ""
        }
    }



     const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };

        return (

        <div className="admin-contacts-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="admin-contacts-header">

                <div>

                    <h1>
                        Contact Messages
                    </h1>

                    <p>
                        Manage messages received
                        from users.
                    </p>

                </div>

            </div>


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="contact-stats-grid">


                {/* Total */}

                <div className="contact-stat-card">

                    <div className="contact-stat-icon total-icon">

                        <Mail size={21} />

                    </div>


                    <div>

                        <span>
                            Total Messages
                        </span>

                        <h3>
                            {totalMessages}
                        </h3>

                    </div>

                </div>


                {/* New */}

                <div className="contact-stat-card">

                    <div className="contact-stat-icon new-icon">

                        <MessageSquare size={21} />

                    </div>


                    <div>

                        <span>
                            New
                        </span>

                        <h3>
                            {newMessages}
                        </h3>

                    </div>

                </div>


                {/* Read */}

                <div className="contact-stat-card">

                    <div className="contact-stat-icon read-icon">

                        <Clock size={21} />

                    </div>


                    <div>

                        <span>
                            Read
                        </span>

                        <h3>
                            {readMessages}
                        </h3>

                    </div>

                </div>


                {/* Resolved */}

                <div className="contact-stat-card">

                    <div className="contact-stat-icon resolved-icon">

                        <CheckCircle size={21} />

                    </div>


                    <div>

                        <span>
                            Resolved
                        </span>

                        <h3>
                            {resolvedMessages}
                        </h3>

                    </div>

                </div>

            </div>


{/* =================================
    TOOLBAR
================================= */}

<div className="contacts-toolbar">

    {/* Search */}
    <div className="contacts-search">
        <Search size={18} />

        <input
            type="text"
            placeholder="Search by name, email or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>


    {/* Filters */}
    <div className="contacts-filters">

        {/* Status */}
        <select
            value={statusFilter}
            onChange={(e) =>
                setStatusFilter(e.target.value)
            }
        >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
        </select>


        {/* Sort */}
        <select
            value={sortBy}
            onChange={(e) =>
                setSortBy(e.target.value)
            }
        >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="nameAZ">Name A-Z</option>
            <option value="nameZA">Name Z-A</option>
        </select>

    </div>

</div>



            {/* =================================
                TABLE
            ================================= */}

            <div className="contacts-table-container">


                {loading ? (

                    <div className="contacts-state">

                        <p>
                            Loading messages...
                        </p>

                    </div>


                ) : filteredContacts.length === 0 ? (

                    <div className="contacts-state">

                        <MessageSquare
                            size={42}
                        />

                        <h3>
                            No messages found
                        </h3>

                        <p>
                            There are no contact
                            messages to display.
                        </p>

                    </div>


                ) : (

                    <table className="contact-table">


                        <thead>

                            <tr>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Subject
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>


                            {filteredContacts.map(
                                (contact) => (

                                    <tr
                                        key={
                                            contact._id
                                        }
                                    >


                                        {/* Name */}

                                        <td>

                                            <div className="contact-name">

                                                {contact.name ||
                                                    "Unknown"}

                                            </div>

                                        </td>


                                        {/* Email */}

                                        <td>

                                            <div className="contact-email">

                                                {contact.email ||
                                                    "-"}

                                            </div>

                                        </td>


                                        {/* Subject */}

                                        <td>

                                            <div className="contact-subject">

                                                {contact.subject ||
                                                    "No subject"}

                                            </div>

                                        </td>


                                        {/* Category */}

                                        <td>

                                            <span className="category-badge">

                                                {contact.category ||
                                                    "-"}

                                            </span>

                                        </td>


                                        {/* Status */}

                                        {/* <td>

                                            <span
    className={`status-badge ${getStatusClass(
        contact.status
    )}`}
>
    {contact.status === "new" && "New"}
    {contact.status === "read" && "Read"}
    {contact.status === "resolved" && "Resolved"}
</span>


                                        </td> */}
{/* Status */}
<td className="contact-status-cell">
    <span
        className={`table-status-badge ${
            contact.status === "new"
                ? "table-status-new"
                : contact.status === "read"
                ? "table-status-read"
                : contact.status === "resolved"
                ? "table-status-resolved"
                : ""
        }`}
    >
        {contact.status === "new"
            ? "New"
            : contact.status === "read"
            ? "Read"
            : contact.status === "resolved"
            ? "Resolved"
            : "New"}
    </span>
</td>


                                        {/* Date */}

                                        <td>

                                            <div className="contact-date">

                                                {formatDate(
                                                    contact.createdAt
                                                )}

                                            </div>

                                        </td>


                                        {/* Actions */}

                                        <td>

                                            <div className="contact-actions">


                                                {/* View */}

                                                <button
                                                    type="button"
                                                    className="contact-view-btn"
                                                    title="View message"
                                                    onClick={()=>navigate(`/admin/contact/${contact._id}`)}
                                                >

                                                    <Eye
                                                        size={17}
                                                    />

                                                </button>


                                                {/* Delete */}

                                                <button
                                                    type="button"
                                                    className="contact-delete-btn"
                                                    title="Delete message"
                                                    onClick={() =>
                                                        handleDelete(
                                                            contact._id
                                                        )
                                                    }
                                                >

                                                    <Trash2
                                                        size={17}
                                                    />

                                                </button>


                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );
    

 
}

export default AdminContact