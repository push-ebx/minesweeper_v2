import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import styles from "./styles.module.scss"

export const GameModal = ({title, body, isOpen, onClose}) => (
  <Modal hideCloseButton backdrop={"blur"} isOpen={isOpen} onClose={onClose} placement="center">
    <ModalContent className={styles.modal}>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            {body}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onPress={onClose}>
              Ок
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
)