import { Modal } from "antd";


const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
    return (
        <>
            <Modal
                visible={showModal}
                title="Order Payment Info"
                onCancel={() => setShowModal(!showModal)}
            >
                {/* <pre>{JSON.stringify(session, null, 4)}</pre> */}
                <p>Payment Intent: {session.payment_intent}</p>
                <p>Payment Status: {session.payment_status}</p>
                <p>
                    Payment total: {session.currency.toUpperCase()}{" "}
                    {session.amount_total / 100}
                </p>
                <p>Stripe customerId: {session.customer}</p>
                <p>Stripe customerId: {session.customer_details.name}</p>
                <p>Stripe customerId: {session.customer_details.email}</p>
            </Modal>
        </>
    );
};

export default OrderModal;
