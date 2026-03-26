import { useEffect, useRef, useState } from "react";
import fileicon from "../assets/noteicon.svg";
import backarrow from "../assets/backlongarrowicon.svg";
import { deleteNoteApi, getNotesApi, postNotesApi, updateNoteApi } from "../api/auth.api";

type Props = {
  onClose: () => void;
  patient: any
};

type Note = {
  _id: number;
  title: string;
  date: string;
  content: string;
  description: string;
  intakeFormId: string
};



export default function NoteModal({ onClose, patient }: Props) {
  const [newTitle, setNewTitle] = useState("");
  const [step, setStep] = useState<"list" | "detail">("list");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  
  const [loading, setLoading] = useState(true);
  console.log(loading)
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const fetchNotesData = async () => {
    setLoading(true);
    try {
      const res = await getNotesApi(patient?.id);
      setNotes(res.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {

    fetchNotesData();

  }, []);
  const handleAddNote = async () => {
  if (!newNoteContent.trim()) return;

  try {
    const payload = {
      intakeFormId: patient?.id,
      title: newTitle,
      description: newNoteContent,
    };

    const res = await postNotesApi(payload);
    const createdNote = res?.data?.data;

    setNotes((prev) => [createdNote, ...prev]);
fetchNotesData()
    setNewNoteContent("");
    setNewTitle("");
    setShowAddModal(false);
  } catch (error) {
    console.log(error);
  }
};

  const handleEditNote = async () => {
    try {
      setIsEditing(true)
      const newNote = {
        description: content,
      };
      const res = await updateNoteApi(selectedNote?._id,newNote);
      setSelectedNote(res?.data?.data)
      setIsEditing(false);
      fetchNotesData()
    } catch (error) {
      console.log(error)
    }
  };
 const handleDeleteNote = async () => {
  try {
    await deleteNoteApi(selectedNote?._id);

    setNotes((prev) =>
      prev.filter((note) => note._id !== selectedNote?._id)
    );

    setStep("list");
    setSelectedNote(null);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {step === "list" && (
        <div className="bg-[#B2E5FD] rounded-[20px] lg:max-w-[998px] max-w-[95%] max-h-[95vh] overflow-auto w-full px-8 py-4">

          <div className="flex justify-between items-center gap-3 mb-3">
            <div className="flex items-center gap-3 mb-2">
              <img src={fileicon} className="w-6" />
              <p className="text-[26px] font-medium">Note List</p>
            </div>
          </div>

          <div className="bg-white rounded-[16px] overflow-auto max-h-[460px] min-h-[200px]">
            {(notes ?? []).map((note:any) => (
              <button
                key={note._id}
                onClick={() => {
                  1
                  setSelectedNote(note);
                  setContent(note.description);
                  setStep("detail");
                }}
                className="w-full flex justify-between px-6 py-4 border-b last:border-none text-left"
              >
                <span className="lg:max-w-[350px] max-w-[200px] truncate">{note.title ?? note.description}</span>
                <span className="text-[#00000080]">
                  {new Date(note.updatedAt ?? note.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </button>
            ))}
            {
              notes.length === 0 && (
                <div className="flex justify-center items-center h-[200px]">
                  <p className="text-[#00000080]">No notes found</p>
                </div>
              )
            }
          </div>

          <div className="flex justify-between gap-3 mt-6">
            <button
              onClick={onClose}
              className="border border-[#0000004D] text-[20px] px-12 rounded-[10px] h-[50px] max-w-[398px] w-full bg-white"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#00598D] text-white text-[20px] px-10 rounded-[10px] h-[50px] w-full max-w-[398px]"
            >
              Add Note
            </button>
          </div>
        </div>
      )}

      {step === "detail" && selectedNote && (
        <div className="bg-[#B2E5FD] rounded-[20px] max-w-[998px] w-full px-8 py-4">

          <div className="flex items-center gap-3 mb-2">
            <img src={fileicon} className="w-6" />
            <p className="text-[26px] font-medium">Note List</p>
          </div>

          <div className="bg-white rounded-[16px] p-6 text-[#00000080] leading-relaxed mb-6">

            <div className="flex items-center gap-4 mb-4">
              <button onClick={() => { setStep("list"); setIsEditing(false); }}>
                <img src={backarrow} className="w-6 invert" />
              </button>

              <p className="text-[16px] font-medium text-black truncate max-w-[70%]">
                {selectedNote.title}
              </p>

              <span className="ml-auto text-[#00000080] text-[16px]">
                {new Date(selectedNote.updatedAt ?? selectedNote.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
              </span>
            </div>

            {isEditing ? (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full outline-none text-black max-h-[400px]"
                rows={10}
              />
            ) : (
              <div className="text-black whitespace-pre-line  max-h-[260px] overflow-auto">
                {content}
              </div>
            )}

          </div>

          <div className="flex justify-between gap-6">

            <button
              onClick={handleDeleteNote}
              className="border border-[red] text-red-500 text-[20px] px-10 rounded-[10px] h-[50px] w-full max-w-[398px]"
            >
              Delete
            </button>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#00598D] text-white text-[20px] px-10 rounded-[10px] h-[50px] w-full max-w-[398px]"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleEditNote}
                className="bg-[#00598D] text-white text-[20px] px-10 rounded-[10px] h-[50px] w-full max-w-[398px]"
              >
                Submit
              </button>
            )}

          </div>

        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#B2E5FD] rounded-[20px] max-w-[600px] w-full px-6 py-5">

            <p className="text-[22px] font-medium mb-4">Add Note</p>
            <div className="flex flex-col gap-2">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full rounded-[10px] p-4 outline-none text-black"
              placeholder="Enter note title..."
            />
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full rounded-[10px] p-4 outline-none text-black"
              rows={6}
              placeholder="Enter note description..."
            />
</div>
            <div className="flex gap-4 mt-5">
              <button
                onClick={() => setShowAddModal(false)}
                className="border border-[#0000004D] text-[18px] px-6 rounded-[10px] h-[45px] w-full bg-white"
              >
                Cancel
              </button>

              <button
                onClick={handleAddNote}
                className="bg-[#00598D] text-white text-[18px] px-6 rounded-[10px] h-[45px] w-full"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}