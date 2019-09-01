import { Modal, ModalHeader,Button,ModalFooter,ModalBody,Title} from 'reactstrap';
function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
      render{
        return (
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <ModalHeader closeButton>
            <Title>Modal heading</Title>
          </ModalHeader>
          <ModalBody>Woohoo, you're reading this text in a modal!</ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
    );
  }
  