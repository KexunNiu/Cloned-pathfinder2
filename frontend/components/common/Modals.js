import { CancelButton, ConfirmButton } from './Buttons';
import { ReadonlyForm } from './Forms';
import { ErrorAlert } from './Alerts';


/**
 * A base modal component that can be used to build more complex modals. Takes a title, children, isOpen, and onClose props.
 * @param title The title of the modal
 * @param children Child elements to be rendered inside the modal
 * @param isOpen Whether or not the modal is open. Usually a state variable from the parent component
 * @returns
 */
const Modal = ({ title, children, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="flex flex-col gap-6 p-6">
                        <h5 className="text-xl font-bold">{title}</h5>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};


/**
 * A modal with cancel and confirm buttons. Takes a title, children, isOpen, onClose, and onConfirm props
 * @param title The title of the modal
 * @param children Child elements to be rendered inside the modal
 * @param isOpen Whether or not the modal is open. Usually a state variable from the parent component
 * @param onCloseClick A callback function to be called when the modal is closed. Usually a state setter from the parent component
 * @param onConfirmClick A callback function to be called when the confirm button is clicked. Use this to handle the action that the modal is confirming
 * @returns
 */
const ConfirmationModal = ({ title = 'Confirm', children, errorMsg, isOpen, onCloseClick, onConfirmClick }) => {
    return (
        <Modal title={title} isOpen={isOpen}>
            {children}
            {errorMsg && <ErrorAlert msg={errorMsg} />}
            <div className="flex flex-row justify-end gap-2">
                <CancelButton onClick={onCloseClick} />
                <ConfirmButton onClick={onConfirmClick} />
            </div>
        </Modal>
    );
};


/**
 * A modal that displays a readonly form and a single close button. Takes a title, fieldMap, isOpen, onClose, and onConfirm props.
 * @param title The title of the modal
 * @param fieldMap An object that maps field names to their values. The field names will be used as the labels for the form fields. This will be passed to the ReadonlyForm component
 * @param isOpen Whether or not the modal is open. Usually a state variable from the parent component
 * @param onCloseClick A callback function to be called when the modal is closed. Usually a state setter from the parent component
 * @returns
 */
const DetailsModal = ({ title = 'View Details', fieldMap, isOpen, onCloseClick }) => {
    if (!isOpen) return null;

    return (
        <Modal title={title} isOpen={isOpen}>
            <div className="text-left">
                <ReadonlyForm fieldMap={fieldMap} />
            </div>
            <div className="flex flex-row justify-end gap-2">
                <CancelButton text="Close" onClick={onCloseClick} />
            </div>
        </Modal>
    );
};


export { ConfirmationModal, DetailsModal };
