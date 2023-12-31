import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { BiSolidHelpCircle } from "react-icons/bi";
import Swal from "sweetalert2";

const Category = () => {
  const [categories, setCategory] = useState([]);
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [budgetruleid, setBudgetRuleId] = useState('');
  const [budgetRules, setListBudgetRule] = useState([]);

  const [msg, setMsg] = useState('');

  // Get UserId with Cookie
  const UserId = Cookies.get("userId");

  useEffect(()=>{
    getListCatFunc();
    getListBudgetRuleFunc();
  }, []);

  const getListCatFunc = async () =>{
    const response = await axios.get(`https://api-nabugyuk.agilearn.id/users/${UserId}/category`);
    setCategory(response.data);
  }

  const getListBudgetRuleFunc = async () =>{
    const response = await axios.get(`https://api-nabugyuk.agilearn.id/users/${UserId}/budgetrule`);
    setListBudgetRule(response.data);
  }

  const addCatFunc = async (e) => {
    e.preventDefault();
    if (name.trim() === '' || budget === '' || budgetruleid === '') {
      Swal.fire({
        icon: 'error',
        title: 'Input Failed',
        text: 'Please fill in all fields',
        allowOutsideClick: false, // Prevent closing Swal on outside click
        confirmButtonText: 'OK',
      });
      return;
    }
  
    try {
      const respon = await axios.post(`https://api-nabugyuk.agilearn.id/users/${UserId}/category`, {
        name: name,
        budget: parseInt(budget),
        budgetruleId: parseInt(budgetruleid),
      });
      if (respon.status === 201) {
        await Swal.fire({
          icon: 'success',
          title: 'Category Added!',
          text: respon.data.message,
          allowOutsideClick: false, // Prevent closing Swal on outside click
          confirmButtonText: 'OK',
        });
      }
      window.location.reload();
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Input Failed',
          text: error.response.data.message,
          allowOutsideClick: false, // Prevent closing Swal on outside click
          confirmButtonText: 'OK',
        });
        setMsg(error.response.data.msg);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Input Failed!',
          text: error.response.data.message,
          allowOutsideClick: false, // Prevent closing Swal on outside click
          confirmButtonText: 'OK',
        });
        setMsg(error.response.data.msg);
      }
    }
  };
  

  const deleteCategory = async (id) => {
    try{
        const respon = await axios.delete(`https://api-nabugyuk.agilearn.id/category/${id}`);
        if (respon.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'Category Deleted!',
            text: respon.data.message,
            allowOutsideClick: false, // Prevent closing Swal on outside click
            confirmButtonText: 'OK',
          });
        }
        getListCatFunc();
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Category Failed Deleted!',
          allowOutsideClick: false, // Prevent closing Swal on outside click
          confirmButtonText: 'OK',
        });
        console.log(error);
    }
  }

  const formatRupiah = (angka) => {
    const numberFormat = new Intl.NumberFormat("id-ID");
    return `Rp. ${numberFormat.format(angka)}`;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBudgetRule, setSelectedBudgetRule] = useState("All");
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories
      .filter((category) => {
        const budgetRuleMatch = selectedBudgetRule === "All" || category.budgetrule?.name === selectedBudgetRule;
        return budgetRuleMatch;
      })
      .slice(indexOfFirstItem, indexOfLastItem);

  const filteredCategory = categories.filter((category) => {
    const budgetRuleMatch = selectedBudgetRule === "All" || category.budgetrule?.name === selectedBudgetRule;
    return budgetRuleMatch;
});

  const totalPages = Math.ceil(filteredCategory.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section>
    <div className="card flex-fill">
        <div className="card-header">
            <h5 className="card-title mb-0 text-dark">Category</h5>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-12">
                <form onSubmit={addCatFunc} className="card-body">
                    <p className="text-center text-danger">{msg}</p>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="name">Name</label>
                            <input
                                className="form-control"
                                style={{ backgroundColor: '#f7f7f7' }}
                                type="text"
                                placeholder="Nama atau Keterangan Category"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="budget">Budget</label>
                            <input
                                className="form-control"
                                style={{ backgroundColor: '#f7f7f7' }}
                                type="text"
                                placeholder="Budget"
                                value={formatRupiah(budget)}
                                onChange={(e) => setBudget(e.target.value.replace(/\D/g, ''))}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="budgetRuleId">Budget Rule</label>
                            <select
                                className="form-select cursor-pointer"
                                style={{ backgroundColor: '#f7f7f7' }}
                                value={budgetruleid}
                                onChange={(e) => setBudgetRuleId(e.target.value)}
                                required
                            >
                                <option value={""}>Pilih Budget Rule</option>
                                {budgetRules.map((budgetRule) => (
                                    <option key={budgetRule.id} value={budgetRule.id}>
                                        {budgetRule.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button className="btn btn-lg btn-success">Tambahkan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    {/* TABEL */}
    <div className="card flex-fill">
        <div className="card-header">
            <h5 className="card-title mb-0 text-dark">Category Table</h5>
        </div>
        <div className="card-body">
            {/* Filter Start */}
            <div className="d-flex mb-3">
                <div className="col-md-3 px-1">
                    <select
                        className="form-select mr-2 cursor-pointer"
                        value={selectedBudgetRule}
                        onChange={(e) => setSelectedBudgetRule(e.target.value)}
                        disabled={currentPage !== 1}
                        title={currentPage !== 1 ? "Kembali ke page awal untuk memilih budget rule" : ""}
                    >
                        <option value="All">All Budget Rules</option>
                        {budgetRules.map((budgetRule) => (
                            <option key={budgetRule.id} value={budgetRule.name}>
                                {budgetRule.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Filter End */}
            <div className="table-responsive">
            <table className="table table-hover table-striped text-center border">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Name</th>
                        <th style={{ width: '20%' }}>Budget</th>
                        <th style={{ width: '20%' }}>Budget Rule</th>
                        <th style={{ width: '20%' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((category, index) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{formatRupiah(category.budget)}</td>
                            <td>{category.budgetrule ? category.budgetrule.name : 'Belum ditentukan'}</td>
                            <td className='text-center'>
                                <div className="buttons btn-group">
                                    <Link to={`editCategory/${category.id}`} className="btn btn-sm btn-info me-2">
                                        <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                    </Link>
                                    <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger">
                                        <BiTrash style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {/* Pagination buttons */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <div className='p-2'>
                    Page {currentPage} of {totalPages} Total Pages ({(itemsPerPage * (currentPage - 1)) + 1} - {(itemsPerPage * (currentPage - 1)) + 5 > filteredCategory.length ? filteredCategory.length : (itemsPerPage * (currentPage - 1)) + 5} of {filteredCategory.length})
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</section>

  );
  
  
}

export default Category