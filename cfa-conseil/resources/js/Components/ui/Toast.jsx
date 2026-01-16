import React, { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertTriangle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
};

export default function Toast({ message, type = "info", onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white shadow-lg border border-gray-200 rounded-xl px-4 py-3 w-80"
                >
                    {iconMap[type]}
                    <p className="text-gray-800 text-sm flex-1">{message}</p>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
