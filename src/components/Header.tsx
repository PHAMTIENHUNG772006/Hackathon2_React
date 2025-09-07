import { useCallback, useState } from "react";
import { Input } from "antd";
import { Button, Modal } from "antd";
import type { Book } from "../App";

interface HeaderProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export default function Header({ books, setBooks }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState<{ [key: string]: string }>({});
  const statusOptions = [
    { label: "Có sẵn", value: "available" },
    { label: "Hết hàng", value: "out_of_stock" },
    { label: "Ngừng phát hành", value: "discontinued" },
  ];
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBook: Book = {
      id: Date.now(),
      title: input.title,
      author: input.author,
      genre: input.genre,
      publishedYear: Number(input.publishedYear),
      quantity: Number(input.quantity),
      available: Number(input.available),
      isbn: input.isbn,
      status: "available",
    };

    setBooks([...books, newBook]);
    setInput({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      quantity: "",
      isbn: "",
      status: "available",
    });
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
     setInput({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      quantity: "",
      isbn: "",
      status: "available",
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#6E64C5",
        padding: "30px 20px",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          color: "#000",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          📚 Quản lí thư viện
        </h1>
        <p>Hệ thống quản lí sách hiện đại và thông minh</p>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "20px",
          gap: "15px",
          color: "#6E64C5",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            height: "100px",
            padding: "20px",
            borderRadius: "8px",
            color: "#6E64C5",
            fontWeight: "700",
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            4
          </h1>
          <p>Tổng số sách</p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            height: "100px",
            padding: "20px",
            borderRadius: "8px",
            color: "#6E64C5",
            fontWeight: "700",
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            3
          </h1>
          <p>Sách có sẵn</p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            height: "100px",
            padding: "20px",
            borderRadius: "8px",
            color: "#6E64C5",
            fontWeight: "700",
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            1
          </h1>
          <p>Hết Hàng</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
        <Input placeholder="🔍 Tìm kiếm theo tên hoặc tác giả..." />
        <select
          name=""
          id=""
          style={{ borderRadius: "5px", height: "30px", color: "#000" }}
        >
          <option value="" disabled>
            📁 Tất cả thể loại{" "}
          </option>
          <option value="">Công nghệ</option>
          <option value="">Tiểu thuyết</option>
        </select>
        <Button type="primary" onClick={showModal}>
          + Thêm sách
        </Button>
      </div>
      <Modal
        title="📖 Thêm sách mới"
        open={isModalOpen}
        onOk={handleOk}
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
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: 600 }}>Tên*</label>
            <input
             value={input.title || ""}
              type="text"
              placeholder="Tên sách"
              onChange={handleChange}
              name="title"
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "8px 10px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: 600 }}>Tác giả*</label>
            <input
              type="text"
              value={input.author || ""}
              placeholder="Tác giả"
              onChange={handleChange}
              name="author"
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "8px 10px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: 600 }}>Thể loại*</label>
            <input
              type="text"
              value={input.genre || ""}
              placeholder="Thể loại"
              onChange={handleChange}
              name="genre"
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "8px 10px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: 600 }}>Năm xuất bản*</label>
            <input
              type="number"
              value={input.publishedYear || ""}
              placeholder="VD: 2024"
              onChange={handleChange}
              name="publishedYear"
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "8px 10px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: 600 }}>Số lượng*</label>
            <input
              type="number"
              value={input.quantity || ""}
              placeholder="Nhập số lượng"
              onChange={handleChange}
              name="quantity"
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "8px 10px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: 600 }}>ISBN*</label>
            <input
              type="text"
              value={input.isbn || ""}
              placeholder="Mã ISBN"
              onChange={handleChange}
              name="isbn"
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "8px 10px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: 600 }}>Trạng thái</label>
            <select name="status" onChange={handleChange}>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
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
      </Modal>
    </div>
  );
}
