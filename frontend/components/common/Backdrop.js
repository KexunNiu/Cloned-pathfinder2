/**
 * A backdrop component that can be displayed under a modal or dropdown menu to capture clicks outside of the modal or menu
 * @param isVisible Whether the backdrop should be visible or not
 * @param onClick The function to call when the backdrop is clicked
 */
const Backdrop = ({ isVisible, onClick }) => {
	return isVisible && <div className="fixed inset-0 bg-black/10 z-10 transition" onClick={onClick} />;
};

export default Backdrop;
