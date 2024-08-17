import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { FaEdit, FaTrashAlt, FaCheck, FaEye, FaTimes, FaArrowUp, FaArrowDown, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

Modal.setAppElement('#root');

const FaqTable = () => {
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [loadings, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFAQ, setSelectedFAQ] = useState(null); // State for the selected banner
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate()

  const notify = () => {
    toast.success("Updated Successfully!");
  };

  const pageSize = 5;

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faqs) =>
      faqs.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [faqs, searchTerm]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Question",
        accessor: "question",
        Cell: ({ row }) => (
          <span
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => navigate(`/faq/editFAQ/${row.original._id}`)}
          >
            {row.original.question}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => value === "active" ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />,
        disableSortBy: true,
      },
      {
        Header: "Options",
        Cell: ({ row }) => (
          <div className="flex  gap-4">
            <button className="text-gray-600 hover:text-gray-800 transition" onClick={() => handleView(row.original)}>
              <FaEye />
            </button>
            <button className="text-blue-500 hover:text-blue-700 transition">
              <Link to={`/faq/editFAQ/${row.original._id}`}><FaEdit /></Link>
            </button>
            <button className="text-red-500 hover:text-red-700 transition" onClick={() => deleteFaq(row.original._id)}>
              <FaTrashAlt />
            </button>
          </div>
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: filteredFaqs,
    },
    useSortBy
  );

  const handleView = (faq) => {
    setSelectedFAQ(faq);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFAQ(null);
  };

  const fetchData = async (pageIndex) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3006/api/faq/getFAQ?page=${pageIndex + 1}`, { withCredentials: true });
      const faqsWithIds = response.data.data.map((faqItem, index) => ({
        ...faqItem,
        id: pageIndex * pageSize + index + 1,
      }));
      setFaqs(faqsWithIds);
      setPageCount(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFaq = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3006/api/faq/deleteFaq?id=${id}`, { withCredentials: true });

      fetchData(pageIndex);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(pageIndex);
  }, [pageIndex]);

  const fetchHeadings = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/pageHeading/heading?pageType=faq', { withCredentials: true });
      const { heading, subheading } = response.data;
      setHeading(heading || '');
      setSubheading(subheading || '');
    } catch (error) {
      console.error(error);
    }
  };

  const saveHeadings = async () => {
    try {
      await axios.put('http://localhost:3006/api/pageHeading/updateHeading?pageType=faq', {
        pagetype: 'faq',
        heading,
        subheading,
      }, { withCredentials: true });
      notify();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHeadings();
  }, []);

  const handleHeadingChange = (e) => setHeading(e.target.value);
  const handleSubheadingChange = (e) => setSubheading(e.target.value);

  return (
    <div className="p-4 overflow-x-auto">
      <ToastContainer />
      <div className="mb-8 border border-gray-200 shadow-lg p-4 rounded ">
        <div className="grid md:grid-cols-2 md:gap-2 grid-cols-1">
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 uppercase font-serif">Heading</label>
            <input
              type="text"
              value={heading}
              onChange={handleHeadingChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 uppercase font-serif">Sub heading</label>
            <input
              type="text"
              value={subheading}
              onChange={handleSubheadingChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
        </div>
        <button
          onClick={saveHeadings}
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition  duration-300 font-serif"
        >
          Save
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-700 font-serif uppercase">FAQs</h1>
        <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300 font-serif">
          <Link to="/faq/createFAQ"><FaPlus size={15} /></Link>
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
        />
      </div>
      <h2 className="text-md font-semibold mb-4">Manage FAQs</h2>
      {loadings ? (
      <div className="flex justify-center"><UseAnimations animation={loading} size={56} /></div>

      ) : (
        <>{faqs.length == 0 ? <div className="flex justify-center items-center"><iframe className="w-96 h-96" src="https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"></iframe></div>
          :  <table className="w-full mt-4 border-collapse" {...getTableProps()}>
          <thead className="bg-slate-700 hover:bg-slate-800 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-2 px-4 border-b border-gray-300 cursor-pointer"
                  >
                    <div className="flex items-center uppercase font-serif  gap-2 ">
                      <span className="">{column.render("Header")}</span>
                      {column.canSort && (
                        <span className="ml-1">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaArrowDown />
                            ) : (
                              <FaArrowUp />
                            )
                          ) : (
                            <FaArrowDown className="text-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b border-gray-300 hover:bg-gray-100 transition duration-150 ">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="py-2 px-4">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>}</>
      
      )}
      <div className="mt-4 flex justify-center">
        <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0} className="mr-2 px-3 py-1 bg-slate-700 rounded hover:bg-slate-900 transition text-white">
          {"<<"}
        </button>{" "}
        <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0} className="mr-2 px-3 py-1  bg-slate-700 rounded hover:bg-slate-900 transition text-white">
          {"<"}
        </button>{" "}
        <button onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex + 1 >= pageCount} className="mr-2 px-3 py-1  bg-slate-700 rounded hover:bg-slate-900 transition text-white">
          {">"}
        </button>{" "}
        <button onClick={() => setPageIndex(pageCount - 1)} disabled={pageIndex + 1 >= pageCount} className="mr-2 px-3 py-1  bg-slate-700 rounded hover:bg-slate-900 transition text-white">
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Banner Details"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      >
         
        <div className="bg-white p-8 rounded shadow-lg w-96 relative">
        <button onClick={closeModal} className="absolute top-5 right-5 text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
          <h2 className="text-xl font-bold font-serif mb-4">FAQ</h2>
          {selectedFAQ && (
            <div className="">
              <div className="flex mt-2">
                <p className="mr-2 font-semibold font-serif">Qusetion :</p>
                <p>{selectedFAQ.question}</p>
              </div>
            <div className=" mt-2">
                <p className="mr-2 font-semibold font-serif">Answer :</p>
                <ReactQuill
                  readOnly={true}
                  value={selectedFAQ.answer}
                  modules={{ toolbar: false }}
                  theme="bubble"
                  className="quill"
                />
              </div>

            </div>
          )}
          {/* <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300"
          >
            Close
          </button> */}
        </div>
      </Modal>
    </div>
  );
};

export default FaqTable;