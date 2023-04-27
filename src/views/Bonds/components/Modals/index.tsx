import React from 'react'
import { StyledButton } from '../styles'
import UserBillModalView from './UserBillModalView'
import { BillsImage } from '../UserBillsView/styles'
import WarningModal from './WarningModal'
import useModal from 'hooks/useModal'
import { Bills } from 'views/Bonds/types'
import BuyBillModalView from './BuyBillModalView'

interface BillModalProps {
  bill: Bills
  buttonText?: string
  id?: number
  billId?: string
  buttonSize?: string
  buyFlag?: boolean
  billCardImage?: string
  disabled?: boolean
}

const BillModal: React.FC<BillModalProps> = ({
  buttonText,
  bill,
  id,
  buttonSize,
  buyFlag,
  billId,
  billCardImage,
  disabled,
}) => {
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView bill={bill} onDismiss={() => null} />,
    true,
    false,
    `billsModal${id}`,
  )
  const [onPresentUserBillModal] = useModal(
    <UserBillModalView bill={bill} billId={billId} onDismiss={() => null} />,
    true,
    true,
    `billsModal${bill.billNftAddress}-${billId}`,
  )
  const [onPresentBuyWarning] = useModal(
    <WarningModal bill={bill} onDismiss={() => null} />,
    true,
    true,
    `billsWarningModal${id}`,
  )
  return !billCardImage ? (
    <StyledButton
      onClick={
        buyFlag
          ? parseFloat(bill?.discount ?? '0') < 0
            ? onPresentBuyWarning
            : onPresentBuyBillsModal
          : onPresentUserBillModal
      }
      buttonSize={buttonSize}
      disabled={disabled}
      sx={{ lineHeight: '20px' }}
    >
      {buttonText}
    </StyledButton>
  ) : (
    <BillsImage image={billCardImage} onClick={onPresentUserBillModal} style={{ cursor: 'pointer' }} />
  )
}

export default React.memo(BillModal)
