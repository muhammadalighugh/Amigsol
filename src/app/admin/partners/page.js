"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Users, Search, Plus, Download, Eye, Edit, Trash2, User, X, Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Timestamp } from "firebase/firestore";

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const router = useRouter();

  const initialFormData = {
    fullName: "",
    email: "",
    partnershipType: "Developer",
    status: "active",
    earnings: "$0",
    address: "",
    city: "",
    country: "",
    linkedinProfile: "",
    website: "",
    whatsappContact: "",
    education: [],
    skills: [],
    experienceLevel: "",
    githubLink: "",
    portfolioLink: "",
    availability: "",
    ndaAccepted: false,
    termsAccepted: false,
    privacyAccepted: false,
    hearAboutUs: "",
    targetAudience: [],
    marketingChannels: [],
    payoutMethod: "",
  };

  const statusOptions = ["active", "inactive", "rejected"];

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email && currentUser.email.endsWith("@gmail.com")) {
        setUser(currentUser);
      } else {
        setError("You are not authorized to view this page.");
        setLoading(false);
        router.push("/AdminLogin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch partners real-time
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "partnerApplications"), where("status", "!=", "pending"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const apps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          joinDate: doc.data().createdAt ? new Date(doc.data().createdAt.toDate()).toLocaleDateString() : "N/A",
        }));
        setPartners(apps);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching partners:", err);
        setError("Failed to load partners. Please try again.");
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  const filteredPartners = partners.filter((p) => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All Types" || p.partnershipType === filterType;
    const matchesStatus = filterStatus === "All Status" || p.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleView = (partner) => {
    setSelectedPartner(partner);
    setFormData(partner);
    setEditedStatus(partner.status);
    setEditMode(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedPartner(null);
    setFormData(initialFormData);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleSaveDetails = async () => {
    try {
      const updateFields = {
        ...formData,
        updatedAt: Timestamp.fromDate(new Date()),
        updatedBy: user.email,
      };
      delete updateFields.id; // Remove non-updatable fields
      delete updateFields.joinDate;

      if (selectedPartner) {
        await updateDoc(doc(db, "partnerApplications", selectedPartner.id), updateFields);
        toast.success("Partner updated successfully!", { position: "top-right" });
      } else {
        updateFields.createdAt = Timestamp.fromDate(new Date());
        await addDoc(collection(db, "partnerApplications"), updateFields);
        toast.success("Partner added successfully!", { position: "top-right" });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving partner:", error);
      toast.error(`Failed to save partner: ${error.message}`, { position: "top-right" });
    }
  };

  const handleSaveStatus = async () => {
    try {
      await updateDoc(doc(db, "partnerApplications", selectedPartner.id), {
        status: editedStatus,
        updatedAt: Timestamp.fromDate(new Date()),
        updatedBy: user.email,
      });
      setSelectedPartner({ ...selectedPartner, status: editedStatus });
      setFormData({ ...formData, status: editedStatus });
      toast.success("Status updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(`Failed to update status: ${error.message}`, { position: "top-right" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;
    try {
      await deleteDoc(doc(db, "partnerApplications", id));
      toast.success("Partner deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting partner:", error);
      toast.error(`Failed to delete partner: ${error.message}`, { position: "top-right" });
    }
  };

  const handleExport = () => {
    const headers = "Full Name,Email,Partnership Type,Status,Earnings,Join Date\n";
    const csvContent = partners.map((p) => 
      `"${p.fullName.replace(/"/g, '""')}","${p.email.replace(/"/g, '""')}","${p.partnershipType}","${p.status}","${p.earnings || "$0"}","${p.joinDate}"`
    ).join("\n");
    const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "partners.csv";
    link.click();
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degreeName: "", institution: "", startYear: "", endYear: "", description: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({ ...formData, education: newEducation });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#8BE31F]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center text-lg font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">Partners</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage all your partners</p>
        </div>
        <button onClick={handleAdd} className="bg-[#8BE31F] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#7ACC1B] transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option>All Types</option>
            <option>Developer</option>
            <option>Referral</option>
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option>All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={handleExport} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#8BE31F] transition-colors flex items-center text-gray-600 dark:text-gray-400">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-black" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-black dark:text-white">{partner.fullName}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        partner.partnershipType === "Developer" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {partner.partnershipType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        partner.status === "active"
                          ? "bg-green-100 text-green-800"
                          : partner.status === "inactive"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white font-medium">
                    {partner.earnings || "$0"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{partner.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(partner)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(partner.id)} className="text-red-600 hover:text-red-900 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && formData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black dark:text-white">
                {selectedPartner ? `${formData.fullName}'s Details` : "Add New Partner"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {!editMode ? (
              <div className="space-y-8">
                {/* View Mode */}
                <section>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Personal Information</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Full Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.fullName}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Email</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.email}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Address</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.address}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">City</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.city}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Country</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.country}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {formData.linkedinProfile ? (
                          <a href={formData.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {formData.linkedinProfile}
                          </a>
                        ) : "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Website</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {formData.website ? (
                          <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {formData.website}
                          </a>
                        ) : "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">WhatsApp Contact</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.whatsappContact}</dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Education Background</h3>
                  {formData.education.length > 0 ? (
                    <div className="space-y-4">
                      {formData.education.map((edu, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{edu.degreeName}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution} ({edu.startYear} - {edu.endYear})</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{edu.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No education information provided.</p>
                  )}
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Program Specific Details</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Partnership Type</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.partnershipType}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Status</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Join Date</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.joinDate}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Earnings</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.earnings}</dd>
                    </div>
                    {formData.partnershipType === "Developer" ? (
                      <>
                        <div className="md:col-span-2">
                          <dt className="font-medium text-gray-700 dark:text-gray-300">Skills</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{formData.skills.join(", ") || "N/A"}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-700 dark:text-gray-300">Experience Level</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{formData.experienceLevel || "N/A"}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-700 dark:text-gray-300">GitHub Link</dt>
                          <dd className="text-gray-900 dark:text-gray-100">
                            {formData.githubLink ? (
                              <a href={formData.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {formData.githubLink}
                              </a>
                            ) : "N/A"}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-700 dark:text-gray-300">Portfolio Link</dt>
                          <dd className="text-gray-900 dark:text-gray-100">
                            {formData.portfolioLink ? (
                              <a href={formData.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {formData.portfolioLink}
                              </a>
                            ) : "N/A"}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-700 dark:text-gray-300">Availability</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{formData.availability || "N/A"}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-700 dark:text-gray-300">NDA Accepted</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{formData.ndaAccepted ? "Yes" : "No"}</dd>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <dt className="font-medium text-gray-700 dark:text-gray-300">Heard About Us</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{formData.hearAboutUs || "N/A"}</dd>
                        </div>
                        <div className="md:col-span-2">
                          <dt className="font-medium text-gray-700 dark:text-gray-300">Target Audience</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{formData.targetAudience?.join(", ") || "N/A"}</dd>
                        </div>
                        <div className="md:col-span-2">
                          <dt className="font-medium text-gray-700 dark:text-gray-300">Marketing Channels</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{formData.marketingChannels?.join(", ") || "N/A"}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-700 dark:text-gray-300">Payout Method</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{formData.payoutMethod || "N/A"}</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Agreements</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Terms Accepted</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.termsAccepted ? "Yes" : "No"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Privacy Accepted</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{formData.privacyAccepted ? "Yes" : "No"}</dd>
                    </div>
                  </dl>
                </section>

                {/* Edit Buttons */}
                {selectedPartner && (
                  <>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setEditMode(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Edit Details
                      </button>
                    </div>
                    <section>
                      <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Edit Status</h3>
                      <div className="flex items-center space-x-4">
                        <select
                          value={editedStatus}
                          onChange={(e) => setEditedStatus(e.target.value)}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={handleSaveStatus}
                          className="bg-[#8BE31F] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#7ACC1B] transition-colors"
                        >
                          Save Status
                        </button>
                      </div>
                    </section>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {/* Edit Mode */}
                <section>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={formData.linkedinProfile}
                        onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Website</label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">WhatsApp Contact</label>
                      <input
                        type="text"
                        value={formData.whatsappContact}
                        onChange={(e) => setFormData({ ...formData, whatsappContact: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Education Background</h3>
                  <div className="space-y-4">
                    {formData.education.map((edu, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                        <input
                          type="text"
                          placeholder="Degree Name"
                          value={edu.degreeName}
                          onChange={(e) => updateEducation(index, "degreeName", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                        />
                        <input
                          type="text"
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                        />
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Start Year"
                            value={edu.startYear}
                            onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                            className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="End Year"
                            value={edu.endYear}
                            onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                            className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <textarea
                          placeholder="Description"
                          value={edu.description}
                          onChange={(e) => updateEducation(index, "description", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                        />
                        <button
                          onClick={() => removeEducation(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addEducation}
                      className="bg-[#8BE31F] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#7ACC1B] transition-colors"
                    >
                      Add Education
                    </button>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Program Specific Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Partnership Type</label>
                      <select
                        value={formData.partnershipType}
                        onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      >
                        <option>Developer</option>
                        <option>Referral</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Join Date</label>
                      <p className="text-gray-900 dark:text-gray-100">{formData.joinDate}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Earnings</label>
                      <input
                        type="text"
                        value={formData.earnings}
                        onChange={(e) => setFormData({ ...formData, earnings: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    {formData.partnershipType === "Developer" ? (
                      <>
                        <div className="md:col-span-2">
                          <label className="font-medium text-gray-700 dark:text-gray-300">Skills (comma separated)</label>
                          <input
                            type="text"
                            value={formData.skills.join(", ")}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(", ") })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="font-medium text-gray-700 dark:text-gray-300">Experience Level</label>
                          <input
                            type="text"
                            value={formData.experienceLevel}
                            onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="font-medium text-gray-700 dark:text-gray-300">GitHub Link</label>
                          <input
                            type="text"
                            value={formData.githubLink}
                            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="font-medium text-gray-700 dark:text-gray-300">Portfolio Link</label>
                          <input
                            type="text"
                            value={formData.portfolioLink}
                            onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="font-medium text-gray-700 dark:text-gray-300">Availability</label>
                          <input
                            type="text"
                            value={formData.availability}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.ndaAccepted}
                            onChange={(e) => setFormData({ ...formData, ndaAccepted: e.target.checked })}
                            className="mr-2"
                          />
                          <label className="font-medium text-gray-700 dark:text-gray-300">NDA Accepted</label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="font-medium text-gray-700 dark:text-gray-300">Heard About Us</label>
                          <input
                            type="text"
                            value={formData.hearAboutUs}
                            onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="font-medium text-gray-700 dark:text-gray-300">Target Audience (comma separated)</label>
                          <input
                            type="text"
                            value={formData.targetAudience.join(", ")}
                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value.split(", ") })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="font-medium text-gray-700 dark:text-gray-300">Marketing Channels (comma separated)</label>
                          <input
                            type="text"
                            value={formData.marketingChannels.join(", ")}
                            onChange={(e) => setFormData({ ...formData, marketingChannels: e.target.value.split(", ") })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="font-medium text-gray-700 dark:text-gray-300">Payout Method</label>
                          <input
                            type="text"
                            value={formData.payoutMethod}
                            onChange={(e) => setFormData({ ...formData, payoutMethod: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Agreements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        className="mr-2"
                      />
                      <label className="font-medium text-gray-700 dark:text-gray-300">Terms Accepted</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.privacyAccepted}
                        onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                        className="mr-2"
                      />
                      <label className="font-medium text-gray-700 dark:text-gray-300">Privacy Accepted</label>
                    </div>
                  </div>
                </section>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDetails}
                    className="bg-[#8BE31F] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#7ACC1B] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}