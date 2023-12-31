import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import moment from "moment";
import { BiSolidHelpCircle } from "react-icons/bi";

const Income = () => {
  const [incomes, setIncome] = useState([]);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [tanggalPemasukan, setTanggalPemasukan] = useState('');

  const [idWallet, setWalletId] = useState('');
  const [wallets, setListWallet] = useState([]);

  const [msg, setMsg] = useState(''); 

  // Get UserId with Cookie
  const UserId = Cookies.get("userId");

  useEffect(()=>{
    getListIncomeFunc();
    getListWalletFunc(); 
  }, []);

  const getListWalletFunc = async () =>{
    const response = await axios.get(`https://api-nabugyuk.agilearn.id/users/${UserId}/wallets`);
    setListWallet(response.data);
  }

  const getListIncomeFunc = async () =>{
    const response = await axios.get(`https://api-nabugyuk.agilearn.id/users/${UserId}/incomes`);
    setIncome(response.data);
  }

  const addIncomeFunc = async(e) => {
    e.preventDefault();
    try {
        const respon = await axios.post(`https://api-nabugyuk.agilearn.id/users/${UserId}/incomes`,{
            name: name,
            balance: parseInt(balance),
            tanggal_pemasukan: tanggalPemasukan,
            walletId: parseInt(idWallet)
        });

        if (respon.status === 201) {
          await Swal.fire({
              icon: 'success',
              title: 'Income Added!',
              text: respon.data.message,
              allowOutsideClick: false,
              confirmButtonText: 'OK',
          });
        }

        window.location.reload();
    } catch (error) {
        if(error.response.status === 400){
            Swal.fire({
              icon: 'error',
              title: 'Input Failed',
              text:error.response.data.message,
              allowOutsideClick: false, // Prevent closing Swal on outside click
              confirmButtonText: 'OK',
            });
            setMsg(error.response.data.msg);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Input Failed!',
            text:error.response.data.message,
            allowOutsideClick: false, // Prevent closing Swal on outside click
            confirmButtonText: 'OK',
          });
          setMsg(error.response.data.msg);
        }
    }
  }

  const deleteIncome = async (id) => {
    try{
        await axios.delete(`https://api-nabugyuk.agilearn.id/incomes/${id}`);
        getListIncomeFunc();
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Income Failed Deleted!',
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

  // Filter and Pagination
  const [selectedWallet, setSelectedWallet] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incomes
      .filter((incomes) => {
          const walletMatch = selectedWallet === "All" || incomes.wallet?.name === selectedWallet;
          return walletMatch;
      })
      .slice(indexOfFirstItem, indexOfLastItem);

  const filteredIncomes = incomes.filter((incomes) => {
      const walletMatch = selectedWallet === "All" || incomes.wallet?.name === selectedWallet;
      return walletMatch;
  });
  
  const totalPages = Math.ceil(filteredIncomes.length / itemsPerPage);
  const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
      }
  };

  return (
    <section>
      <div className="card flex-fill">
        <div className='card-header'>
            <h1 className="card-title mb-0 text-dark">
                <strong>Income</strong>
            </h1>
        </div>
        <div className="row justify-content-center">
            <div className="col-12">
                <form onSubmit={addIncomeFunc} className="card-body">
                    <p className="text-center text-danger">{msg}</p>
                    <div className='row mb-3'>
                        <div className="col-md-6">
                            <input type="text" className="form-control mb-3" id="name" placeholder="Nama atau Keterangan Pemasukan"
                                value={name} onChange={(e)=> setName(e.target.value)} style={{ backgroundColor: '#f7f7f7' }}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="balance" value={formatRupiah(balance)}
                                onChange={(e)=> setBalance(e.target.value.replace(/\D/g, ''))} style={{ backgroundColor: '#f7f7f7' }}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-6">
                            <input type="date" className="form-control mb-3" id="tanggalPemasukan" value={tanggalPemasukan}
                                onChange={(e)=> setTanggalPemasukan(e.target.value)}
                            required
                            />
                        </div>
                        <div className="col-md-6">
                            <select className="form-select" id="wallet" name="wallet" value={idWallet} onChange={(e)=>
                                setWalletId(e.target.value)}
                                required
                                >
                                <option value={""}>Pilih wallet</option>
                                {wallets.map((wallet) => (
                                <option key={wallet.id} value={wallet.id}>
                                    {wallet.name}
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
              <h5 className="card-title mb-0 text-dark">Income Table</h5>
          </div>

          <div className="card-body">
              <div className="d-flex col-md-5 mb-3">
                  <div className="col-md-5 px-1">
                      <select className="form-select mr-2 cursor-pointer" value={selectedWallet} onChange={(e)=>
                          setSelectedWallet(e.target.value)}
                          disabled={currentPage !== 1}
                          title={currentPage !== 1 ? "Kembali ke page awal untuk memilih wallet " : ""}
                          >
                          <option value="All">All Wallets</option>
                          {wallets.map((wallet) => (
                          <option key={wallet.id} value={wallet.name}>
                              {wallet.name}
                          </option>
                          ))}
                      </select>
                  </div>
              </div>
              
                <div className="table-responsive card border">
                    <table className="table table-hover table-striped text-center">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Tanggal Pemasukan</th>
                                <th style={{ width: '20%' }}>Name</th>
                                <th style={{ width: '20%' }}>Balance</th>
                                <th style={{ width: '20%' }}>Wallet</th>
                                <th style={{ width: '20%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((income) => (
                                <tr key={income.id}>
                                    <td>{moment(income.tanggal_pemasukan).format('DD-MM-YYYY')}</td>
                                    <td>{income.name}</td>
                                    <td>{formatRupiah(income.balance)}</td>
                                    <td>{income.wallet ? income.wallet.name : 'Belum ditentukan'}</td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <Link to={`editIncome/${income.id}`} className="btn btn-sm btn-info me-2">
                                                <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                            </Link>
                                            <button onClick={() => deleteIncome(income.id)} className="btn btn-sm btn-danger">
                                                <BiTrash style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

              
              {/* PAGINATION */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <div className="p-2">
                        Page {currentPage} of {totalPages} Total Pages (
                        {(itemsPerPage * (currentPage - 1)) + 1} -{' '}
                        {(itemsPerPage * (currentPage - 1)) + 5 > filteredIncomes.length
                            ? filteredIncomes.length
                            : (itemsPerPage * (currentPage - 1)) + 5}{' '}
                        of {filteredIncomes.length})
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

export default Income