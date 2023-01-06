import { Button, Flex, Modal, Svg, Text } from "components/uikit";
import useActivate from "utils/connection/activate";
import connectors from "../config";

const ConnectWalletModal = () => {
  const activate = useActivate();
  return (
    <Modal maxWidth="400px" minWidth="350px" title="Connect to a Wallet">
      <Flex
        sx={{ height: "400px", flexDirection: "column", overflow: "scroll" }}
      >
        {connectors.map(({ label, icon, connection }) => {
          return (
            <Button
              fullWidth
              variant="tertiary"
              sx={{
                justifyContent: "space-between",
                margin: "3.5px 0px",
                height: "45px",
                alignItems: "center",
                background: "white4",
              }}
              onClick={() => activate(connection)}
            >
              <Text weight={500} size="15px">
                {label}
              </Text>
              <Svg icon={icon} width="30px" />
            </Button>
          );
        })}
      </Flex>
    </Modal>
  );
};

export default ConnectWalletModal;
