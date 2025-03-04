import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react-pro";

function PromptView({ title, body, activeState, setActiveState, actionFunc }) {
  return (
    <>
      <CModal
        alignment="center"
        visible={activeState}
        onClose={() => setActiveState(false)}
      >
        <CModalHeader>
          <CModalTitle>{title || "Demo Title"}</CModalTitle>
        </CModalHeader>
        <CModalBody>{body || "Demo Body"}</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setActiveState(false)}>
            Cancel
          </CButton>
          <CButton onClick={actionFunc} color="primary">
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default PromptView;
