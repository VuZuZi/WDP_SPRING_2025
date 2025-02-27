import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  FormErrorMessage,
  useToast,
  Select,
  Box,
  Image,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { getHouseByUser } from "../../service/houseService";

const UpdateRoomModal = ({ isOpen, onClose, onUpdateRoom, roomData }) => {
  const [houses, setHouses] = useState([]);
  const [images, setImages] = useState([]);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHouseByUser();
        setHouses(response.data.house || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách House:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (roomData) {
      setValue("RoomID", roomData.RoomID);
      setValue("Price", roomData.Price);
      setValue("Location", roomData.Location);
      setValue("Amenity", roomData.Amenity);
      setValue("HouseID", "");
      setValue("Status", roomData.Status);
      if (roomData.img) {
        setImages([{ preview: roomData.img }]);
      }
    }
  }, [roomData, setValue]);

  const handleHouseSelect = (e) => {
    const selectedHouse = houses.find((house) => house._id === e.target.value);
    if (selectedHouse) {
      setValue("Location", selectedHouse.Location);
      setValue("HouseID", selectedHouse._id);
    }
  };

  const handleImageSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const newImage = {
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      };
      setImages([newImage]);
    }
  };

  const handleRemoveImage = () => {
    setImages([]);
  };

  const onSubmit = async (data) => {
    try {
      data.Price = Number(data.Price);
      data.RoomID = Number(data.RoomID);

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (images.length > 0 && images[0].file) {
        formData.append("img", images[0].file);
      }

      await onUpdateRoom(roomData._id, formData);

      toast({
        title: "Cập nhật phòng thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      reset();
      setImages([]);
      onClose();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật phòng. Vui lòng thử lại.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent maxW="50vw">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontSize="3xl">Cập nhật phòng</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.RoomID}>
                <FormLabel fontSize="2xl">Số phòng</FormLabel>
                <Input
                  {...register("RoomID", {
                    required: "Vui lòng nhập số phòng",
                  })}
                />
                <FormErrorMessage fontSize="lg">
                  {errors.RoomID?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.Price}>
                <FormLabel fontSize="2xl">Giá phòng</FormLabel>
                <Input
                  type="number"
                  {...register("Price", {
                    required: "Vui lòng nhập giá phòng",
                  })}
                />
                <FormErrorMessage fontSize="lg">
                  {" "}
                  {errors.Price?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="2xl">Chọn House</FormLabel>
                <Select
                  onChange={handleHouseSelect}
                  placeholder="Chọn một House"
                >
                  {houses.map((house) => (
                    <option key={house._id} value={house._id}>
                      {house.Location}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isInvalid={errors.Location}>
                <FormLabel fontSize="2xl">Vị trí</FormLabel>
                <Input
                  {...register("Location", {
                    required: "Vui lòng nhập vị trí",
                  })}
                />
                <FormErrorMessage fontSize="lg">
                  {errors.Location?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="2xl">Trạng thái</FormLabel>
                <Select {...register("Status")} fontSize="xl">
                  <option key="available" value="available">
                    Có sẵn
                  </option>
                  <option key="booked" value="booked">
                    Đã được đặt
                  </option>
                  <option key="maintenance" value="maintenance">
                    Đang sửa chữa
                  </option>
                </Select>
              </FormControl>

              <FormControl isInvalid={errors.Amenity}>
                <FormLabel fontSize="2xl">Tiện ích</FormLabel>
                <Textarea
                  {...register("Amenity", {
                    required: "Vui lòng nhập tiện ích",
                  })}
                />
                <FormErrorMessage fontSize="lg">
                  {errors.Amenity?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="2xl">Hình ảnh</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                {images.length > 0 && (
                  <Box position="relative">
                    <Image
                      src={images[0].preview}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      size="xs"
                      colorScheme="red"
                      position="absolute"
                      top={1}
                      right={1}
                      onClick={handleRemoveImage}
                    />
                  </Box>
                )}
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter bg="white">
            <Button
              variant="ghost"
              mr={3}
              onClick={onClose}
              size="lg"
              fontSize="xl"
            >
              Hủy
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
              size="lg"
              fontSize="xl"
            >
              Cập nhật
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateRoomModal;
