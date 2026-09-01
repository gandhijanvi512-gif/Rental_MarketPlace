import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../service/api"
import {
    ArrowLeft,
    Mail,
    User,
    FileText,
    Tag,
    Calendar,
    MessageSquare,
    Trash2,
    CheckCircle,
    Clock
} from "lucide-react";
import toast from "react-hot-toast";

const AdminContactDetails=()=>{

    const navigate=useNavigate()
    const {id}=useParams()

    const [contact,setContact]=useState(null)
    const[loading,setLoading]=useState(true)
    const [updatingStatus,setUpdategingStatus]=useState(false)
    const [deleting,setDeleting]=useState(false)


    const fetchContact=async()=>{
        try{
            const res=await api.get(`/admin/getContact/${id}`)


            if(res.data.success){
                setContact(res.data.data)
            }
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(id){
            fetchContact()
        }
    },[id])


    // update status

    const handleStatusChange=async(e)=>{
        const newStatus=e.target.value;

        try{
            const res=await api.patch(`/admin/updatecontactstatus/${id}/status`,{
                status:newStatus
            })
            if(res.data.success){
                setContact((prev)=>({
                    ...prev,
                    status:res.data.data.status
                }))
                toast.success(`Message status changed to ${newStatus}`);
            }
        }catch(err){
            console.log(err);
            
        }finally{
            setUpdategingStatus(false)
        }
    }

    // delete

    const handleDelete=async()=>{
        const confirmDelete=window.confirm("Are you sure you want to delete this contact message?")

        if(!confirmDelete){
            return
        }

        try{
            setDeleting(true);

            const res=await api.delete(`/admin/deletecontact/${id}`)

            if(res.data.success){
                alert(
                    "Contact message deleted successfully!"
                );

                navigate("/admin/contacts");
            }
        }catch(err){
                console.log(err);
                
        }finally{
            setDeleting(false)
        }
    }


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


    // format date

    const formatDate=(date)=>{
        if(!date){
            return "-"
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day:"2-digit",
                month:"short",
                year:"numeric",
                hour:"2-digit",
                minute:"2-digit"
            }
        )
    }

    // =====================================
    // LOADING STATE
    // =====================================

    if (loading) {

        return (

            <div className="contact-details-state">

                <div className="contact-details-loader">

                    <div className="loader-spinner"></div>

                    <p>
                        Loading contact details...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================
    // CONTACT NOT FOUND
    // =====================================

    if (!contact) {

        return (

            <div className="contact-details-state">

                <MessageSquare size={42} />

                <h3>
                    Contact message not found
                </h3>

                <p>
                    This message may have been deleted
                    or does not exist.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/contacts")
                    }
                >
                    <ArrowLeft size={17} />
                    Back to Contacts
                </button>

            </div>

        );

    }


    // =====================================
    // MAIN UI
    // =====================================

    return (

        <div className="admin-contact-details-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="contact-details-header">


                {/* BACK BUTTON */}

                <button
                    type="button"
                    className="back-to-contacts"
                    onClick={() =>
                        navigate("/admin/contacts")
                    }
                >

                    <ArrowLeft size={18} />

                    <span>
                        Back to Contacts
                    </span>

                </button>


                {/* TITLE */}

                <div className="contact-details-title">

                    <div>

                        <h1>
                            Contact Message
                        </h1>

                        <p>
                            View and manage contact
                            message details.
                        </p>

                    </div>


                    {/* DELETE */}

                    <div className="contact-header-actions">

                        <button
                            type="button"
                            className="details-delete-btn"
                            onClick={handleDelete}
                            disabled={deleting}
                        >

                            <Trash2 size={17} />

                            {deleting
                                ? "Deleting..."
                                : "Delete Message"
                            }

                        </button>

                    </div>

                </div>

            </div>


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <div className="contact-details-grid">


                {/* =================================
                    LEFT SIDE
                ================================= */}

                <div className="contact-details-main">


                    {/* =================================
                        USER INFORMATION
                    ================================= */}

                    <div className="details-card">


                        <div className="details-card-header">

                            <div className="details-card-icon">

                                <User size={19} />

                            </div>


                            <div>

                                <h2>
                                    User Information
                                </h2>

                                <p>
                                    Contact information
                                </p>

                            </div>

                        </div>


                        <div className="user-information">


                            {/* NAME */}

                            <div className="info-item">

                                <span className="info-label">
                                    Name
                                </span>


                                <div className="info-value">

                                    <User size={16} />

                                    <span>
                                        {contact.name || "-"}
                                    </span>

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="info-item">

                                <span className="info-label">
                                    Email
                                </span>


                                <div className="info-value">

                                    <Mail size={16} />

                                    <span>
                                        {contact.email || "-"}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        MESSAGE INFORMATION
                    ================================= */}

                    <div className="details-card">


                        <div className="details-card-header">

                            <div className="details-card-icon">

                                <MessageSquare size={19} />

                            </div>


                            <div>

                                <h2>
                                    Message
                                </h2>

                                <p>
                                    User's contact message
                                </p>

                            </div>

                        </div>


                        {/* SUBJECT */}

                        <div className="message-info-row">

                            <div className="message-info-label">

                                <FileText size={17} />

                                <span>
                                    Subject
                                </span>

                            </div>


                            <strong>
                                {contact.subject ||
                                    "No subject"}
                            </strong>

                        </div>


                        {/* CATEGORY */}

                        <div className="message-info-row">

                            <div className="message-info-label">

                                <Tag size={17} />

                                <span>
                                    Category
                                </span>

                            </div>


                            <span className="details-category-badge">

                                {contact.category || "-"}

                            </span>

                        </div>


                        {/* MESSAGE */}

                        <div className="message-content-section">

                            <span className="message-content-label">

                                Message

                            </span>


                            <div className="message-content">

                                {contact.message || "-"}

                            </div>

                        </div>

                    </div>


                </div>


                {/* =================================
                    RIGHT SIDE
                ================================= */}

                <div className="contact-details-sidebar">


                    {/* =================================
                        STATUS CARD
                    ================================= */}

                    <div className="details-card status-card">


                        <div className="details-card-header">

                            <div className="details-card-icon">

                                <CheckCircle size={19} />

                            </div>


                            <div>

                                <h2>
                                    Message Status
                                </h2>

                                <p>
                                    Update message status
                                </p>

                            </div>

                        </div>


                        <label className="status-field-label">

                            Current Status

                        </label>


                        <select
                            className={`details-status-select ${getStatusClass(
                                contact.status
                            )}`}
                            value={
                                contact.status || "new"
                            }
                            onChange={
                                handleStatusChange
                            }
                            disabled={updatingStatus || contact.status==="resolved"}
                        >
                            {contact.status==="new" && (
                                <>
                                    <option value="new">New</option>
                                    <option value="read">Read</option>
                                </>
                            )}
                            {contact.status==="read" && (
                                <>
                                    <option value="read">Read</option>
                                    <option value="resolved">Resolved</option>
                                </>
                            )}
                            {contact.status==="resolved" && (
                                <option value="resolved">Resolved</option>
                            )}

                            {/* <option value="new">
                                New
                            </option>

                            <option value="read">
                                Read
                            </option>

                            <option value="resolved">
                                Resolved
                            </option> */}

                        </select>


                        {updatingStatus && (

                            <p className="status-updating">

                                Updating status...

                            </p>

                        )}

                    </div>


                    {/* =================================
                        DATE CARD
                    ================================= */}

                    <div className="details-card">


                        <div className="details-card-header">

                            <div className="details-card-icon">

                                <Calendar size={19} />

                            </div>


                            <div>

                                <h2>
                                    Message Date
                                </h2>

                                <p>
                                    Contact received
                                </p>

                            </div>

                        </div>


                        <div className="date-information">

                            <Clock size={17} />

                            <span>

                                {formatDate(
                                    contact.createdAt
                                )}

                            </span>

                        </div>

                    </div>


                    {/* =================================
                        CONTACT ID CARD
                    ================================= */}

                    <div className="details-card">


                        <div className="details-card-header">

                            <div className="details-card-icon">

                                <FileText size={19} />

                            </div>


                            <div>

                                <h2>
                                    Contact ID
                                </h2>

                                <p>
                                    Message reference
                                </p>

                            </div>

                        </div>


                        <div className="contact-id">

                            {contact._id}

                        </div>

                    </div>


                </div>

            </div>

        </div>

    );


}

export default AdminContactDetails