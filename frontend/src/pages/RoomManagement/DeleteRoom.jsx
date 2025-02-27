import React from "react";
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  Text,
  useToast,
} from "@chakra-ui/react";

export default function DeleteRoom({
  isOpen,
  onClose,
  onDeleteRoom,
  roomData,
}) {
  const toast = useToast();

  const handleDeleteNippo = async (e) => {
    try {
      e.preventDefault();

      await onDeleteRoom(roomData);

      toast({
        title: "Xóa khóa học thành công",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa khóa học. Vui lòng thử lại.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
      {/* {isLoading && <ContentSpinner />} */}
      <ModalContent
        p={3}
        width={{ base: "80%", md: "40%" }}
        height="30%"
        maxWidth="40%"
      >
        <ModalHeader p="0" paddingLeft={3} fontSize="2xl">
          Xóa phòng
        </ModalHeader>
        <ModalCloseButton borderRadius="100%" borderWidth="1px" bg="gray.100" />
        <ModalBody p="3" overflowY="auto">
          <Text fontSize="2xl">Bạn có muốn xóa phòng này không?</Text>
        </ModalBody>
        <ModalFooter p="3" mt={4} bg="white">
          <Button
            onClick={(e) => handleDeleteNippo(e)}
            w="100%"
            variant="solid"
            bg="red.500"
            color="white"
            size="lg"
            fontSize="2xl"
          >
            XÓA PHÒNG
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
