const Contact = require('../models/Contact');
const { sendServerError } = require('../utils');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      data: -1,
    });
    res.json(contacts);
  } catch (err) {
    sendServerError(res, req);
  }
};

exports.addContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      user: req.user.id,
      name,
      email,
      phone,
      type,
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    sendServerError(res, err);
  }
};

exports.updateContact = async (req, res) => {
  try {
    //Retrieving the contact for the param ID
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ msg: 'Contact Not Found!' });
      return;
    }

    //Making sure the user owns the contact.
    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not Authorized!' });
      return;
    }

    //Build contact object
    const { name, email, phone, type } = req.body;
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    // Updating the contact entry in the database.
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    //Returning the result.
    res.json(contact);
  } catch (err) {
    sendServerError(res, err);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    // Retreiving the contact object.
    const contact = await Contact.findById(req.params.id);

    // Validating the contact exist
    if (!contact) {
      res.status(404).json({ msg: 'Contact Not Found!' });
      return;
    }

    // Validating the contact belongs to the user.
    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not Authorized!' });
      return;
    }

    // Deleting the contact
    await contact.remove();
    res.json(contact);
  } catch (err) {
    sendServerError(res, err);
  }
};
