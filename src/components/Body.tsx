import React, { useState } from "react";
import { Space, Table, Button, Modal } from "antd";
const { Column } = Table;
import type { Book } from "../App";

interface BodyProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export default function Body({ books, setBooks }: BodyProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const showModal = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const showModalDelete = (book: Book) => {
    setEditingBook(book);
    setIsModalDeleteOpen(true);
  };

  const handleOk = () => {
    if (editingBook) {
      setBooks((prev) =>
        prev.map((b) => (b.id === editingBook.id ? editingBook : b))
      );
    }
    setIsModalOpen(false);
  };

  const handleOkDelete = () => {
    if (editingBook) {
      setBooks((prev) => prev.filter((b) => b.id !== editingBook.id));
    }
    setIsModalDeleteOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  return (
    <div style={{ backgroundColor: "#6E64C5", height: "100vh" }}>
      <div style={{ padding: "25px" }}>
        <Table<Book> pagination={false} dataSource={books} rowKey="id">
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Tên sách" dataIndex="title" key="title" />
          <Column title="Tác giả" dataIndex="author" key="author" />
          <Column title="Thể loại" dataIndex="genre" key="genre" />
          <Column
            title="Năm XB"
            dataIndex="publishedYear"
            key="publishedYear"
          />
          <Column title="Số lượng" dataIndex="quantity" key="quantity" />
          <Column
            title="Action"
            key="action"
            render={(_, record: Book) => (
              <Space size="middle">
                <Button type="primary" onClick={() => showModal(record)}>
                  🖋️ Sửa
                </Button>
                <button
                  type="button"
                  style={{
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#EB4D4D",
                    color: "#fff",
                  }}
                  onClick={() => showModalDelete(record)}
                >
                  🗑️ Xoá
                </button>
              </Space>
            )}
          />
        </Table>
      </div>

      <Modal
        title="✏️ Sửa thông tin sách"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
        style={{
          top: 80,
        }}
        bodyStyle={{
          padding: "20px 30px",
          backgroundColor: "#f9f9ff",
          borderRadius: "8px",
        }}
      >
        {editingBook && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOk();
            }}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontWeight: 600 }}>Tên*</label>
              <input
                type="text"
                placeholder="Tên sách"
                value={editingBook?.title || ""}
                onChange={(e) =>
                  setEditingBook((prev) =>
                    prev ? { ...prev, title: e.target.value } : null
                  )
                }
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontWeight: 600 }}>Tác giả*</label>
              <input
                type="text"
                placeholder="Tác giả"
                value={editingBook?.author || ""}
                onChange={(e) =>
                  setEditingBook((prev) =>
                    prev ? { ...prev, author: e.target.value } : null
                  )
                }
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontWeight: 600 }}>Thể loại*</label>
              <input
                type="text"
                placeholder="Thể loại"
                value={editingBook?.genre || ""}
                onChange={(e) =>
                  setEditingBook((prev) =>
                    prev ? { ...prev, genre: e.target.value } : null
                  )
                }
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontWeight: 600 }}>Năm xuất bản*</label>
              <input
                type="number"
                placeholder="VD: 2024"
                value={editingBook?.publishedYear || ""}
                onChange={(e) =>
                  setEditingBook((prev) =>
                    prev
                      ? { ...prev, publishedYear: Number(e.target.value) }
                      : null
                  )
                }
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontWeight: 600 }}>Số lượng*</label>
              <input
                type="number"
                placeholder="Nhập số lượng"
                value={editingBook?.quantity || ""}
                onChange={(e) =>
                  setEditingBook((prev) =>
                    prev ? { ...prev, quantity: Number(e.target.value) } : null
                  )
                }
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontWeight: 600 }}>ISBN*</label>
              <input
                type="text"
                placeholder="Mã ISBN"
                value={editingBook?.isbn || ""}
                onChange={(e) =>
                  setEditingBook((prev) =>
                    prev ? { ...prev, isbn: e.target.value } : null
                  )
                }
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontWeight: 600 }}>Trạng thái</label>
              <select
                value={editingBook?.status || "available"}
                onChange={(e) =>
                  setEditingBook((prev) =>
                    prev
                      ? {
                          ...prev,
                          status: e.target.value as
                            | "available"
                            | "out_of_stock"
                            | "discontinued",
                        }
                      : null
                  )
                }
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              >
                <option value="available">Có sẵn</option>
                <option value="out">Hết hàng</option>
              </select>
            </div>

            <div>
              <Button
                style={{ marginRight: "10px" }}
                type="primary"
                htmlType="submit"
              >
                Lưu
              </Button>
              <Button onClick={handleCancel}>Huỷ</Button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        title="Xác nhận xoá"
        open={isModalDeleteOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        okText="Xoá"
        cancelText="Huỷ"
      >
        <p>Bạn có chắc muốn xoá không?</p>
      </Modal>
    </div>
  );
}
