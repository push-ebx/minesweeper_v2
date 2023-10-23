import {Card, CardBody} from "@nextui-org/react";
import styles from "./styles.module.scss"

const BoxInfo = ({children}) => {
  return (
    <Card className={styles.card}>
      <CardBody className={styles.card_body}>
        {children}
      </CardBody>
    </Card>
  );
};

export {BoxInfo};