interface CloseButtonProps {
    closePopup: () => void;
}

const CloseButton = ({ closePopup }: CloseButtonProps) => {
    return (
        <div className="close-btn-wrapper">
            <span className="close-btn" onClick={closePopup}>
                <span className="close-icon">&times;</span>
            </span>
        </div>
    );
};

export default CloseButton;
