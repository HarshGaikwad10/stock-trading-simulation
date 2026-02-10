import React from 'react'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import { useDispatch, useSelector } from 'react-redux';
import { transferMoney } from '@/state/Wallet/Action';

const TransferForm = () => {
  const dispatch = useDispatch();
  const {wallet} = useSelector((store)=>store);

  const [formData, setFormData] = React.useState({
    amount: '',
    WalletId: '',
    purpose: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    dispatch(transferMoney({
      jwt: localStorage.getItem("jwt"),
      walletId: formData.WalletId,
      reqData:{
        amount: formData.amount,
        purpose: formData.purpose,
      }
    }));
    console.log(formData)
  }

  return (
    <div className='pt-10 space-y-5'>

      <div>
        <h1 className='pb-1'>Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-7"
          placeholder="$9999"
        />
      </div>

      <div>
        <h1 className='pb-1'>Wallet Id</h1>
        <Input
          name="WalletId"
          onChange={handleChange}
          value={formData.WalletId}
          className="py-7"
          placeholder="#ADER455"
        />
      </div>

      <div>
        <h1 className='pb-1'>Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-7"
          placeholder="Gift for your friend"
        />
      </div>

      <DialogClose className="w-full">
        <button
          onClick={handleSubmit}
          className="w-full py-4 text-lg font-medium rounded-md bg-gray-100 text-black hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </DialogClose>

    </div>
  )
}

export default TransferForm
