import {Card, CardBody} from "@nextui-org/react";
import styles from "./styles.module.scss"

const BoxInfo = ({children, className}) => {
  return (
    <Card className={`${styles.card} ${className}`}>
      <CardBody className={styles.card_body}>
        {children}
      </CardBody>
    </Card>
  );
};

export {BoxInfo};