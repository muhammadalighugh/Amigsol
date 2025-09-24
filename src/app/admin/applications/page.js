"use client";
import { useState, useEffect, useCallback } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Mail, User, CheckCircle, Trash2, Filter, SortAsc, SortDesc, Loader2, Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Timestamp } from "firebase/firestore";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [sortField, setSortField] = useState("fullName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [actionLoading, setActionLoading] = useState({});
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email && currentUser.email.endsWith("@gmail.com")) {
        setUser(currentUser);
      } else {
        setError("You are not authorized to view this page.");
        setLoading(false);
        router.push("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "partnerApplications"));
      const apps = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplications(apps);
      if (apps.length === 0) {
        setError("No applications found.");
      }
    } catch (error) {
      console.error("Error fetching applications:", {
        code: error.code || "N/A",
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Sorting and filtering
  const sortedAndFilteredApps = applications
    .filter((app) => filterStatus === "all" || app.status === filterStatus)
    .sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      return sortOrder === "desc"
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleViewDetails = async (applicationId) => {
    try {
      const docRef = doc(db, "partnerApplications", applicationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSelectedApp({ id: docSnap.id, ...docSnap.data() });
        setIsModalOpen(true);
      } else {
        toast.error("Application not found.", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error fetching application details:", {
        code: error.code || "N/A",
        message: error.message,
        stack: error.stack,
        applicationId,
        timestamp: new Date().toISOString(),
      });
      toast.error("Failed to load application details.", { position: "top-right" });
    }
  };

  const handleApprove = async (applicationId) => {
    if (!confirm("Are you sure you want to approve this application?")) return;
    if (!user) {
      toast.error("User not authenticated.", { position: "top-right" });
      return;
    }
    setActionLoading((prev) => ({ ...prev, [applicationId]: "approve" }));
    try {
      console.log("Approving application:", { applicationId, userEmail: user.email });
      const docRef = doc(db, "partnerApplications", applicationId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Application not found");
      }
      await updateDoc(docRef, {
        status: "approved", // Changed from "active" to "approved"
        earnings: "$0",
        updatedAt: Timestamp.fromDate(new Date()),
        updatedBy: user.email,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: "approved", updatedBy: user.email } : app
        )
      );
      toast.success("Application approved successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error approving application:", {
        code: error.code || "N/A",
        message: error.message,
        stack: error.stack,
        applicationId,
        userEmail: user?.email || "N/A",
        timestamp: new Date().toISOString(),
      });
      toast.error(`Failed to approve application: ${error.message}`, { position: "top-right" });
    } finally {
      setActionLoading((prev) => ({ ...prev, [applicationId]: null }));
    }
  };

  const handleReject = async (applicationId) => {
    if (!confirm("Are you sure you want to reject this application?")) return;
    if (!user) {
      toast.error("User not authenticated.", { position: "top-right" });
      return;
    }
    setActionLoading((prev) => ({ ...prev, [applicationId]: "reject" }));
    try {
      console.log("Rejecting application:", { applicationId, userEmail: user.email });
      const docRef = doc(db, "partnerApplications", applicationId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Application not found");
      }
      await updateDoc(docRef, {
        status: "rejected",
        updatedAt: Timestamp.fromDate(new Date()),
        updatedBy: user.email,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: "rejected", updatedBy: user.email } : app
        )
      );
      toast.success("Application rejected successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error rejecting application:", {
        code: error.code || "N/A",
        message: error.message,
        stack: error.stack,
        applicationId,
        userEmail: user?.email || "N/A",
        timestamp: new Date().toISOString(),
      });
      toast.error(`Failed to reject application: ${error.message}`, { position: "top-right" });
    } finally {
      setActionLoading((prev) => ({ ...prev, [applicationId]: null }));
    }
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
          Partner Applications
        </h2>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#8BE31F] focus:border-[#8BE31F] bg-white dark:bg-gray-700 text-black dark:text-white sm:text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {applications.length} application(s)
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th
                  onClick={() => handleSort("fullName")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Name {sortField === "fullName" && (sortOrder === "asc" ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Email {sortField === "email" && (sortOrder === "asc" ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                </th>
                <th
                  onClick={() => handleSort("partnershipType")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Partnership Type {sortField === "partnershipType" && (sortOrder === "asc" ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Status {sortField === "status" && (sortOrder === "asc" ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedAndFilteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-black dark:text-white">{app.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{app.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{app.partnershipType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : app.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewDetails(app.id)}
                        className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </button>
                      {app.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(app.id)}
                            disabled={actionLoading[app.id]}
                            className={`flex items-center px-3 py-1.5 bg-[#8BE31F] text-black rounded-md hover:bg-[#7ACC1B] focus:outline-none focus:ring-2 focus:ring-[#8BE31F] transition-all ${
                              actionLoading[app.id] === "approve" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {actionLoading[app.id] === "approve" ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(app.id)}
                            disabled={actionLoading[app.id]}
                            className={`flex items-center px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                              actionLoading[app.id] === "reject" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {actionLoading[app.id] === "reject" ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Trash2 className="h-4 w-4 mr-2" />
                            )}
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedAndFilteredApps.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No applications match the selected filter.
            </div>
          )}
        </div>
      </div>
      {/* Modal for Application Details */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4">Application Details</h3>
            <div className="space-y-3">
              <p><strong>ID:</strong> {selectedApp.id}</p>
              <p><strong>Full Name:</strong> {selectedApp.fullName}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Partnership Type:</strong> {selectedApp.partnershipType}</p>
              <p><strong>Status:</strong> {selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1)}</p>
              <p><strong>Updated By:</strong> {selectedApp.updatedBy || "N/A"}</p>
              <p><strong>Updated At:</strong> {selectedApp.updatedAt ? new Date(selectedApp.updatedAt.toDate()).toLocaleString() : "N/A"}</p>
              <p><strong>Created At:</strong> {selectedApp.createdAt ? new Date(selectedApp.createdAt.toDate()).toLocaleString() : "N/A"}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}