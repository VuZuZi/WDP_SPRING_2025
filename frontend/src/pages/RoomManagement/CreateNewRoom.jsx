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
  background,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { getHouseByUser } from "../../service/houseService";

const CreateRoomModal = ({ isOpen, onClose, onCreateRoom }) => {
  const [houses, setHouses] = useState([]);
  const [images, setImages] = useState([]); // Lưu danh sách ảnh (hiện chỉ lấy 1 ảnh)
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      HouseID: "",
      RoomID: "",
      Price: "",
      Location: "",
      Amenity: "",
    },
  });

  // Lấy danh sách House của User
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

  // Khi chọn House, tự động cập nhật location
  const handleHouseSelect = (e) => {
    const selectedHouse = houses.find((house) => house._id === e.target.value);
    if (selectedHouse) {
      setValue("Location", selectedHouse.Location);
      setValue("HouseID", selectedHouse._id);
    }
  };

  // Xử lý chọn ảnh
  const handleImageSelect = (e) => {
    const selectedFile = e.target.files[0]; // Chỉ lấy 1 ảnh
    if (selectedFile) {
      const newImage = {
        file: selectedFile, // File ảnh thật
        preview: URL.createObjectURL(selectedFile), // Preview ảnh
      };
      setImages([newImage]); // Chỉ giữ một ảnh duy nhất
    }
  };

  // Xóa ảnh
  const handleRemoveImage = () => {
    setImages([]);
  };

  // Kiểm tra giá trị Price
  const validatePrice = (value) => {
    const price = Number(value);
    if (isNaN(price)) return "Giá phải là số";
    if (price < 0) return "Giá không thể là số âm";
    return true;
  };

  const onSubmit = async (data) => {
    try {
      // Chuyển đổi dữ liệu số
      data.Price = Number(data.Price);
      data.RoomID = Number(data.RoomID);

      // Xử lý FormData
      const formData = new FormData();

      // Thêm dữ liệu từ form vào FormData
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Thêm ảnh vào FormData (sửa lỗi: truyền file thay vì file.name)
      if (images.length > 0) {
        formData.append("img", images[0].file);
      }

      console.log("check formdata create0", formData);

      // Gửi dữ liệu lên server
      const response = await onCreateRoom(formData);

      if (response.error) {
        toast({
          title: "Lỗi",
          description: "Không thể tạo phòng. Vui lòng thử lại.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else
        toast({
          title: "Tạo phòng thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

      // Reset form và danh sách ảnh
      reset();
      setImages([]);
      onClose();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo phòng. Vui lòng thử lại.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="40vw">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontSize="3xl">Tạo phòng mới</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.RoomID}>
                <FormLabel fontSize="2xl">Số phòng</FormLabel>
                <Input
                  {...register("RoomID", {
                    required: "Vui lòng nhập số phòng",
                    minLength: {
                      value: 1,
                      message: "Số phòng phải có ít nhất 1 ký tự",
                    },
                  })}
                  placeholder="Nhập số phòng"
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
                    validate: validatePrice,
                  })}
                  placeholder="Nhập giá phòng"
                />
                <FormErrorMessage fontSize="lg">
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
                  placeholder="Nhập vị trí"
                />
                <FormErrorMessage fontSize="lg">
                  {errors.Location?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.Amenity}>
                <FormLabel fontSize="2xl">Tiện ích</FormLabel>
                <Textarea
                  {...register("Amenity", {
                    required: "Vui lòng nhập tiện ích",
                  })}
                  placeholder="Nhập tiện ích của phòng"
                  size="sm"
                  resize="vertical"
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
                <Text fontSize="xl" color="gray.500" mt={1}>
                  Chọn một ảnh cho phòng
                </Text>
              </FormControl>

              {/* Hiển thị preview ảnh đã chọn */}
              {images.length > 0 && (
                <Box w="100%">
                  <FormLabel fontSize="2xl">Ảnh đã chọn:</FormLabel>
                  <Box position="relative">
                    <Image
                      src={images[0].preview}
                      alt="Preview"
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
                      aria-label="Remove image"
                    />
                  </Box>
                </Box>
              )}
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
              Tạo mới
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
