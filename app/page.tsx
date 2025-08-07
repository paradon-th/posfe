"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      if (email === "admin@pos.com" && password === "123456") {
        setIsLoggedIn(true);
        alert("เข้าสู่ระบบสำเร็จ");
      } else {
        alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6 text-orange-800">
            เข้าสู่ระบบ POS
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500"
                placeholder="admin@pos.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500"
                placeholder="123456"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <MainApp />;
}

function MainApp() {
  return (
    <div className="min-h-screen bg-orange-50">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-800 mb-4">
          ระบบขายหน้าร้าน
        </h1>
        <p className="text-orange-600 mb-6">ยินดีต้อนรับสู่ระบบ POS</p>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">เมนูหลัก</h2>
          <p>กำลังพัฒนาอยู่...</p>
        </div>
      </div>
    </div>
  );
}
