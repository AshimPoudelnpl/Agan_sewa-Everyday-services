import React from "react";
import {
  useGetBranchQuery,
  useDeleteBranchMutation,
} from "../../redux/features/branchSlice";

const Branches = () => {
  const { data, isLoading } = useGetBranchQuery();
  const branches = data?.data || data?.result || [];
  const [deleteBranch] = useDeleteBranchMutation();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    await deleteBranch(id);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Branches</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Branch
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                District
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {branches.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No branches found
                </td>
              </tr>
            ) : (
              branches.map((branch) => (
                <tr key={branch.branch_id}>
                  <td className="px-6 py-4">{branch.branch_id}</td>
                  <td className="px-6 py-4">{branch.branch_name}</td>
                  <td className="px-6 py-4">{branch.district_name}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(branch.branch_id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Branches;
