// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Position from './Position';

function CreateAngebot() {
    const [angebotData, setAngebotData] = useState({
        clientName: '',
        clientAddress: '',
        clientEmail: '',
        offerNumber: '',
        projectLocation: '',
        items: [],
        netTotal: 0,
        vat: 0,
        grossTotal: 0
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('http://localhost:5000/getCurrentUser', {
                credentials: 'include',
            });
            const userData = await response.json();
            if (response.ok) {
                setUser(userData);
            } else {
                console.error('Not authenticated');
            }
        };
        fetchUser();
    }, []);

    const updateTotals = (items) => {
        const netTotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
        const vat = netTotal * 0.20;  
        const grossTotal = netTotal + vat;
        return { netTotal, vat, grossTotal };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('items')) {
            const idx = parseInt(name.split('[')[1].split(']')[0], 10);
            const key = name.split('.')[1];
            const newItems = [...angebotData.items];
            newItems[idx][key] = parseFloat(value) || 0;

            if (key === 'quantity' || key === 'unitPrice') {
                newItems[idx]['total'] = newItems[idx]['quantity'] * newItems[idx]['unitPrice'];
            }

            const totals = updateTotals(newItems);
            setAngebotData(prevState => ({ ...prevState, items: newItems, ...totals }));
        } else {
            setAngebotData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleAddItem = () => {
        const newItem = { position: angebotData.items.length + 1, quantity: 0, unit: '', description: '', unitPrice: 0, total: 0 };
        const newItems = [...angebotData.items, newItem];
        const totals = updateTotals(newItems);
        setAngebotData(prevState => ({ ...prevState, items: newItems, ...totals }));
    };

    const handleRemoveItem = (index) => {
        const newItems = angebotData.items.filter((_, idx) => idx !== index);
        const totals = updateTotals(newItems);
        setAngebotData(prevState => ({ ...prevState, items: newItems, ...totals }));
    };
    console.log(angebotData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/angebot/createAngebot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(angebotData),
                credentials: 'include',
            });
            const data = await response.json();
            console.log("Submitted Data:", data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-6 min-w-full mx-auto bg-white rounded-xl shadow-md space-y-2 flex items-center">
            <header className='text-right text-lg font-semibold'>
                {user ? `Logged in as ${user.name}` : 'Not logged in'}
            </header>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="text" name="clientName" value={angebotData.clientName} onChange={handleChange} placeholder="Client Name" className="input input-bordered w-full max-w-xs" />
                <input type="text" name="clientAddress" value={angebotData.clientAddress} onChange={handleChange} placeholder="Client Address" className="input input-bordered w-full max-w-xs" />
                <input type="text" name="clientEmail" value={angebotData.clientEmail} onChange={handleChange} placeholder="Client Email" className="input input-bordered w-full max-w-xs" />
                <input type="text" name="offerNumber" value={angebotData.offerNumber} onChange={handleChange} placeholder="Offer Number" className="input input-bordered w-full max-w-xs" />
                <input type="text" name="projectLocation" value={angebotData.projectLocation} onChange={handleChange} placeholder="Project Location" className="input input-bordered w-full max-w-xs" />
                {angebotData.items.map((item, index) => (
                    <Position
                        key={index}
                        item={item}
                        index={index}
                        handleChange={handleChange}
                        handleRemove={() => handleRemoveItem(index)}
                    />
                ))}
                <div className='space-x-2'>
                    <button type="button" onClick={handleAddItem} className="btn btn-primary">Add Item</button>
                    <button type="submit" className="btn btn-success">Save Angebot</button>
                </div>
                <div>
                    <p>Net Total: €{angebotData.netTotal.toFixed(2)}</p>
                    <p>VAT (20%): €{angebotData.vat.toFixed(2)}</p>
                    <p>Gross Total: €{angebotData.grossTotal.toFixed(2)}</p>
                </div>
            </form>
        </div>
    );
}

export default CreateAngebot;
