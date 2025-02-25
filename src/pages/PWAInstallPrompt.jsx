import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import logo from "../blue-logo-without-tagline.svg";

Modal.setAppElement("#root");

const PWAInstallModal = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen, "isModalOpen");
  useEffect(() => {
    console.log("installPromptEvent", installPromptEvent);
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
      setIsModalOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        setInstallPromptEvent(null);
        setIsModalOpen(false);
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Install App Modal"
      className="bg-white text-customBlack shadow-lg max-w-xs w-10/12 flex items-center gap-4 fixed z-50"
      overlayClassName="fixed inset-0 bg-transparent"
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white text-customBlack p-4 rounded-lg shadow-lg max-w-sm w-11/12 mx-auto flex items-center gap-4 fixed top-4  left-4 transform z-50">
        <img src={logo} alt="App Icon" className="w-12 h-12 rounded-md" />
        <div className="flex-1">
          <p className="text-sm font-semibold">Install PWA</p>
        </div>
        <button
          className="text-blue-400 font-bold text-sm hover:text-blue-500"
          onClick={handleInstallClick}
        >
          Install
        </button>
      </div>
    </Modal>
  );
};

export default PWAInstallModal;
