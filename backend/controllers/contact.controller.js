import Contact from "../models/contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message, product } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message,
      ...(product && {
        product: {
          productId: product.productId || undefined,
          productName: product.productName || undefined,
          category: product.category || undefined,
          quantity: product.quantity || undefined,
          notes: product.notes || undefined,
        },
      }),
    });

    await contact.save();

    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact request created successfully",
    });
  } catch (err) {
    console.error("Create Contact Error:", err.message);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


// READ all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ single contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
    res.status(200).json({ success: true, message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
