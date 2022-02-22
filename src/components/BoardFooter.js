import { useState } from 'react';
import Modal from 'react-modal';

export default function BoardFooter({
    bankSize,
    settings,
    onSettingsChanged,
}) {

    const [isBoardSettingsOpen, setIsBoardSettingsOpen] = useState(false);

    return (
        <div className="flex justify-between mx-2 my-4 text-white">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="font-fancy mx-1">{bankSize}</p>
            </div>
            <button className="border-2 border-white rounded-md py-1 font-fancy text-white flex-1 mx-12 hover:opacity-75">
                DONE
            </button>
            <button onClick={() => setIsBoardSettingsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
            <Modal
                isOpen={isBoardSettingsOpen}
                onRequestClose={() => setIsBoardSettingsOpen(false)}
                contentLabel="In-Game Settings"
                className="bg-blue-100 fixed inset-8 md:inset-32 lg:inset-72 m-auto p-8 border-blue-400 border-4 rounded-lg h-max"
            >
                <div className="flex justify-between text-blue-400 w-full mb-12">
                    <span className="font-fancy sele">Settings</span>
                    <button className='hover:opacity-75' onClick={() => setIsBoardSettingsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-blue-400 w-full my-4">
                    <span className='font-sspRegular font-bold'>Tabletop Mode</span>
                    <input type="checkbox" class="toggle toggle-primary cursor-pointer bg-gray-400 border-gray-400 opacity-75" checked={settings?.isTableTopMode} onChange={() => onSettingsChanged({
                        ...settings,
                        isTableTopMode: !settings.isTableTopMode
                    })} />
                </div>
                <div className="flex justify-between text-blue-400 w-full my-4">
                    <span className='font-sspRegular font-bold'>Move Takeback</span>
                    <input type="checkbox" class="toggle toggle-primary cursor-pointer bg-gray-400 border-gray-400 opacity-75" />
                </div>
            </Modal>
        </div>
    )
}