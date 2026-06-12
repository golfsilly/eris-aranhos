"use client";

import React, { memo } from "react";
import { APP_CONFIG } from "@/config/app-config";

function CPRAlertInner() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#000",
        overflow: "hidden",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes siren-rotate { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes heartbeat {
          0%,100%{transform:scale(1)}
          14%{transform:scale(1.35)}
          28%{transform:scale(1)}
          42%{transform:scale(1.2)}
          56%{transform:scale(1)}
        }
        @keyframes ecg-draw { 0%{stroke-dashoffset:800} 100%{stroke-dashoffset:0} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        @keyframes text-glow {
          0%,100%{text-shadow:0 0 10px #ff0000,0 0 30px #ff0000}
          50%{text-shadow:0 0 30px #ff0000,0 0 60px #ff5555,0 0 90px #ff0000}
        }
        @keyframes pulse-ring {
          0%{transform:translate(-50%,-50%) scale(0.6);opacity:0.9}
          100%{transform:translate(-50%,-50%) scale(2.2);opacity:0}
        }
        @keyframes crt-flicker { 0%,97%,100%{opacity:1} 98%{opacity:0.92} 99%{opacity:0.97} }
        @keyframes bpm-bar { 0%{height:4px} 50%{height:40px} 100%{height:4px} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
        @keyframes compress { 0%,100%{transform:scaleY(1)} 40%{transform:scaleY(0.85)} }
        @keyframes alarm-text { 0%,49%{opacity:1} 50%,100%{opacity:0.4} }
      `}</style>

      {/* CRT scanlines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg,rgba(255,0,0,0.03) 0px,rgba(255,0,0,0.03) 1px,transparent 1px,transparent 3px)",
          zIndex: 1,
        }}
      />

      {/* Rotating siren light */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
            animation: "siren-rotate 3s linear infinite",
            willChange: "transform",
            transform: "translateZ(0)",
            background:
              "conic-gradient(from 0deg,transparent 0deg,rgba(255,0,0,0.08) 30deg,transparent 60deg,transparent 180deg,rgba(255,0,0,0.05) 210deg,transparent 240deg)",
          }}
        />
      </div>

      {/* Moving scanline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "3px",
            background:
              "linear-gradient(90deg,transparent,rgba(255,80,80,0.6),transparent)",
            animation: "scanline 2s linear infinite",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Pulse rings */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {[0, 0.6].map((delay, i) => (
          <div
            key={i}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: `2px solid rgba(255,60,60,${0.6 - i * 0.2})`,
              animation: `pulse-ring 1.8s ease-out ${delay}s infinite`,
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          width: "100%",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          animation: "crt-flicker 4s infinite",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "36px",
              background:
                "linear-gradient(to bottom,transparent,#ff3333,transparent)",
            }}
          />
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              color: "#ff6666",
              letterSpacing: "3px",
              animation: "alarm-text 1s step-end infinite",
            }}
          >
            ◉ EMERGENCY ALERT SYSTEM ACTIVE ◉
          </div>
          <div
            style={{
              width: "1px",
              height: "36px",
              background:
                "linear-gradient(to bottom,transparent,#ff3333,transparent)",
            }}
          />
        </div>

        {/* Beating heart */}
        <div
          style={{
            animation: "heartbeat 0.8s ease-in-out infinite",
            marginBottom: "14px",
            position: "relative",
          }}
        >
          <svg width="90" height="90" viewBox="0 0 90 90">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M45 75 C45 75 10 52 10 28 C10 16 19 8 30 8 C37 8 43 12 45 17 C47 12 53 8 60 8 C71 8 80 16 80 28 C80 52 45 75 45 75Z"
              fill="#cc0000"
              filter="url(#glow)"
              opacity="0.95"
            />
            <path
              d="M45 70 C45 70 14 49 14 28 C14 19 22 12 30 12 C38 12 43 17 45 21 C47 17 52 12 60 12 C68 12 76 19 76 28 C76 49 45 70 45 70Z"
              fill="#ff2222"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "11px",
                color: "#fff",
                letterSpacing: "1px",
              }}
            >
              CPR
            </span>
          </div>
        </div>

        {/* ECG Monitor */}
        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            height: "60px",
            background: "rgba(0,30,0,0.8)",
            border: "1px solid #00ff44",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "monospace",
              fontSize: "9px",
              color: "rgba(0,255,68,0.2)",
              letterSpacing: "2px",
            }}
          >
            ECG MONITOR
          </div>
          <svg
            width="100%"
            height="60"
            viewBox="0 0 480 60"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0, willChange: "transform" }}
          >
            <path
              d="M0 30 L40 30 L50 30 L55 8 L62 52 L68 14 L74 30 L90 30 L130 30 L140 30 L145 8 L152 52 L158 14 L164 30 L180 30 L220 30 L230 30 L235 8 L242 52 L248 14 L254 30 L270 30 L310 30 L320 30 L325 8 L332 52 L338 14 L344 30 L360 30 L400 30 L410 30 L415 8 L422 52 L428 14 L434 30 L480 30"
              stroke="#00ff44"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="800"
              style={{ animation: "ecg-draw 2s linear infinite", willChange: "stroke-dashoffset" }}
            />
          </svg>
        </div>

        {/* Main text */}
        <h1
          style={{
            fontSize: "clamp(24px,7vw,36px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "4px",
            margin: "0 0 4px",
            textTransform: "uppercase",
            animation: "text-glow 1.5s ease-in-out infinite",
            lineHeight: 1.1,
          }}
        >
          ขณะนี้กำลังปฏิบัติการ
        </h1>
        <h1
          style={{
            fontSize: "clamp(28px,8vw,42px)",
            fontWeight: 900,
            color: "#ff2222",
            letterSpacing: "2px",
            margin: "0 0 16px",
            textTransform: "uppercase",
            animation: "text-glow 1.5s ease-in-out 0.3s infinite",
            lineHeight: 1.1,
          }}
        >
          ช่วยฟื้นคืนชีพ
        </h1>
        <div
          style={{
            marginTop: "24px",
            fontFamily: "monospace",
            fontSize: "13px",
            color: "#666",
            letterSpacing: "3px",
            textTransform: "uppercase",
            willChange: "opacity, transform",
          }}
        >
          {APP_CONFIG.hospital.name.th}
        </div>
      </div>
    </div>
  );
}

export const CPRAlert = memo(CPRAlertInner);