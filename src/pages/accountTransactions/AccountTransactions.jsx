import React from 'react'
import './AccountTransactions.scss'
import ChangePassword from '../../components/changePassword/ChangePassword'
import RequestSeller from '../../components/requestSeller/RequestSeller'
import { useSelector } from 'react-redux';
import RejectSeller from '../../components/rejectSeller/RejectSeller';
export default function AccountTransactions() {
  const {user} = useSelector(
    (state) => state.auth
  );
  return (
    <div className='account-transactions-container'>
        <ChangePassword/>
        {!user.isSeller ? <RequestSeller/> : <RejectSeller/>}
    </div>
  )
}
