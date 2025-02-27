import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  IconButton,
  HStack,
  Select,
  TableContainer,
  Image,
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import CreateRoomModal from "./RoomManagement/CreateNewRoom";
import UpdateRoomModal from "./RoomManagement/UpdateRoom";
import DeleteRoom from "./RoomManagement/DeleteRoom";
// import ViewDetailRoom from "./RoomManagement/ViewDetailRoom";
import {
  createRoom,
  deleteRoomById,
  getRoomsByFilter,
  updateRoom,
} from "../service/roomService";

const columnsData = [
  { Header: "STT", accessor: "stt" },
  { Header: "Ngày tạo", accessor: "CreatedAt" },
  { Header: "Hình ảnh", accessor: "Image" },
  { Header: "Trạng thái", accessor: "Status" },
  { Header: "Mã phòng", accessor: "RoomID" },
  { Header: "Vị trí", accessor: "Location" },
  { Header: "Giá", accessor: "Price" },
  { Header: "Tiện nghi", accessor: "Amenity" },
];

const HostPage = () => {
  //   const [columns, setColumns] = useState(columnsData);
  const [data, setData] = useState([]); // Dữ liệu từ API
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [totalRoom, settotalRoom] = useState(0); // Tổng số room
  const [page, setPage] = useState(1); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(10); // Số hàng hiển thị trên mỗi trang

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [deleteRoom, setDeleteRoom] = useState(null);
  //   const [viewDetailRoom, setViewDetailRoom] = useState(null);

  // Gọi API để lấy dữ liệu
  const fetchData = async () => {
    try {
      const params = {
        page,
        limit: rowsPerPage,
      };

      const response = await getRoomsByFilter(params);

      setData(response.data.rooms); // Cập nhật dữ liệu
      setTotalPages(response.data.pagination.totalPages); // Cập nhật tổng số trang
      settotalRoom(response.data.pagination.totalRoom);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Gọi API khi `page`, `rowsPerPage`, hoặc `filters` thay đổi
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleCreateRoom = async (roomData) => {
    try {
      // Make API call to create room
      const res = await createRoom(roomData);

      // Refresh the rooms list
      fetchData();
      return res;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error; // This will be caught by the modal's error handling
    }
  };

  const handleUpdateRoom = async (id, roomData) => {
    try {
      // Make API call to update room
      await updateRoom(id, roomData);

      // Refresh the rooms list
      fetchData();
    } catch (error) {
      console.error("Error updating room:", error);
      throw error;
    }
  };

  const handleDeleteRoom = async (roomData) => {
    try {
      // Make API call to update room
      await deleteRoomById(roomData);

      // Refresh the rooms list
      fetchData();
    } catch (error) {
      console.error("Error updating room:", error);
      throw error;
    }
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        {/* Filter Section */}
        <Flex mb={4} justifyContent="space-between" alignItems="center">
          <HStack>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={() => setIsCreateModalOpen(true)}
              fontSize="xl"
            >
              Tạo mới
            </Button>
          </HStack>
        </Flex>

        <CreateRoomModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateRoom={handleCreateRoom}
        />

        <UpdateRoomModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedRoom(null);
          }}
          onUpdateRoom={handleUpdateRoom}
          roomData={selectedRoom}
        />

        <DeleteRoom
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onDeleteRoom={handleDeleteRoom}
          roomData={deleteRoom}
        />

        {/* Table Section */}
        <TableContainer
          border={{
            base: "1px solid #e2e8f0",
          }}
          overflowX="auto"
          overflowY="auto"
          height={`calc(100vh - 205px)`}
          w="100%"
        >
          <Table variant="simple" size="lg" width="100%" height="fit-content">
            <Thead borderWidth={1}>
              <Tr>
                {columnsData.map((column) => (
                  <Th
                    key={column.accessor}
                    border="1px solid #000"
                    borderCollapse="collapse"
                  >
                    {column.Header}
                  </Th>
                ))}
                <Th
                  border="1px solid #000"
                  borderCollapse="collapse"
                  width="0px"
                ></Th>
              </Tr>
            </Thead>
            <Tbody
              borderStyle="solid"
              borderWidth="1px"
              borderColor="#000"
              sx={{
                "tr:nth-of-type(odd)": {
                  backgroundColor: "gray.50",
                },
                tr: {
                  borderBottom: "1px solid #000",
                },
                td: {
                  border: "1px solid #000",
                  borderCollapse: "collapse",
                },
              }}
            >
              {data.map((row, idx) => (
                <Tr key={idx}>
                  {columnsData.some(
                    (item) => item.accessor === "stt" && !item.hidden
                  ) && (
                    <Td
                      key="stt"
                      border="1px solid #000"
                      borderCollapse="collapse"
                    >
                      {idx + 1}
                    </Td>
                  )}
                  {columnsData.some(
                    (item) => item.accessor === "CreatedAt" && !item.hidden
                  ) && (
                    <Td
                      key="createdAt"
                      border="1px solid #000"
                      borderCollapse="collapse"
                    >
                      {`${new Date(row.CreatedAt).getDate()}/${
                        new Date(row.CreatedAt).getMonth() + 1
                      }/${new Date(row.CreatedAt).getFullYear()}`}
                    </Td>
                  )}
                  {columnsData.some(
                    (item) => item.accessor === "Image" && !item.hidden
                  ) && (
                    <Td
                      key="Image"
                      border="1px solid #000"
                      borderCollapse="collapse"
                    >
                      <Image
                        src={row["Image"]}
                        style={{
                          width: "100px",
                          height: "75px",
                          objectFit: "cover",
                        }}
                      />
                    </Td>
                  )}
                  {columnsData.some(
                    (item) => item.accessor === "Status" && !item.hidden
                  ) && (
                    <Td
                      key="Status"
                      border="1px solid #000"
                      borderCollapse="collapse"
                    >
                      {row["Status"] === "available"
                        ? "Có sẵn"
                        : row["Status"] === "booked"
                        ? "Đã được đặt"
                        : "Đang sữa chữa"}
                    </Td>
                  )}
                  {columnsData.map(
                    (column) =>
                      column.accessor !== "stt" &&
                      column.accessor !== "Image" &&
                      column.accessor !== "Status" &&
                      column.accessor !== "CreatedAt" && (
                        <Td
                          key={column.accessor}
                          border="1px solid #000"
                          borderCollapse="collapse"
                        >
                          {row[column.accessor]}
                        </Td>
                      )
                  )}
                  <Td border="1px solid #000" borderCollapse="collapse">
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<HamburgerIcon />}
                        variant="outline"
                      />
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            setSelectedRoom(row);
                            setIsUpdateModalOpen(true);
                          }}
                        >
                          Cập nhật
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setDeleteRoom(row);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Xóa
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {/* Pagination and Column Settings */}
        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          {/* <Menu>
            <MenuButton
              as={IconButton}
              icon={<SettingsIcon />}
              variant="outline"
            />
            <MenuList>
              <Box p={2}>
                <strong>Chỉnh sửa cột</strong>
              </Box>
              <MenuDivider />
              {columns.map((column) => (
                <MenuItem key={column.accessor}>
                  <Checkbox
                    isChecked={!column.hidden}
                    onChange={() => handleToggleColumn(column.accessor)}
                  >
                    {column.Header}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */}
          <HStack>
            <Button
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={page === 1}
            >
              Previous
            </Button>
            <Box>{`Page ${page} of ${totalPages}`}</Box>
            <Button
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              isDisabled={page >= totalPages}
            >
              Next
            </Button>
          </HStack>

          <Box>
            <Flex
              align="center"
              justify="flex-start"
              gap={3}
              fontSize="14px"
              fontWeight="500"
              mb={4}
            >
              <Box>Hiển thị</Box>
              <Select
                size="sm"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                width="70px"
                // borderColor="gray.300"
                backgroundColor="#D8D8E2"
                _hover={{ borderColor: "teal.400" }}
                _focus={{
                  boxShadow: "0 0 0 2px teal.200",
                  borderColor: "teal.400",
                }} // Hiệu ứng khi focus
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Select>
              <Box>của {totalRoom} phòng</Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default HostPage;
