import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cssUpdateTemplateName, cssDeleteTemplate, cssSetTemplates } from "../store";
import { useNavigate, Link } from "react-router-dom";

const TemplateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cssAuth, cssTemplates } = useSelector((state) => state);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editedTemplateName, setEditedTemplateName] = useState("");

  useEffect(() => {
    if (cssAuth) {
      dispatch(cssSetTemplates(cssAuth.id));
    }
  }, [cssAuth]);

  const cleanUpHTML = (htmlString) => {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    return template.innerHTML;
  }; //renders preview of styled component

  const handleComponentClick = (template) => {
    setSelectedComponent(template);
    // setEditedTemplateName(template.name);
  }; //renders list

  const handleTemplateNameChange = (event) => {
    setEditedTemplateName(event.target.value);
  }; //create name for component

  const handleDeleteTemplate = (templateId) => {
    dispatch(cssDeleteTemplate(templateId));
    return navigate("/profile");
  };

  const updateTemplateNameHandler = () => {
    if (!selectedComponent) return;
    dispatch(cssUpdateTemplateName(selectedComponent.id, editedTemplateName));
    setSelectedComponent((prevComponent) => ({
      ...prevComponent,
      name: editedTemplateName,
    }));
    setEditedTemplateName("");
  };

  const copyHtmlTextToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = selectedComponent.htmlText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    // Display the "Copied to clipboard" message
    const clipboardMessage = document.getElementById("css-clipboard-message");
    clipboardMessage.innerText = "Copied to clipboard!";
    setTimeout(() => {
      clipboardMessage.innerText = "";
    }, 2000);
  };

  //jdb add for it to say something like "untitled nav" instead of just untitled
  const renameType = (st) => {
    let str = (st[0].toUpperCase() + st.slice(1)).split("");
    let result = [str[0]];
    for (let i = 1; i < str.length; i++) {
      const char = str[i];
      if (/[A-Z]/.test(char)) {
        result.push(" ");
      }
      result.push(char);
    }
    return result.join("");
  };

  const renderTemplateName = (template) => {
    if (template.name) {
      return template.name;
    } else {
      const dateCreated = new Date(template.createdAt).toLocaleDateString();
      renameType(template.type);
      return `Untitled ${renameType(template.type)}(${dateCreated})`;
    }
  }; // sets untitled component name and date as default if no name

  const handleEditName = () => {
    if (selectedComponent) {
      setEditedTemplateName(selectedComponent.name || "");
    }
  };

  const handleSaveName = () => {
    updateTemplateNameHandler();
  };

  const renderNoComponentsMessage = () => {
    return (
      <div className="css-no-components-message">
        <p>You have no components!</p>
        <Link to="/" className="css-stylelink">
          Style a Component
        </Link>
      </div>
    );
  };

  return (
    <div className="css-template-list-container">
      <div className="css-templatesidebar">
        <h4 className="css-proheader">My Components</h4>
        <table className="css-profile-comp-table">
          <tbody>
            {cssTemplates
              .filter((template) => template.userId === cssAuth.id)
              .map((template) => (
                <tr
                  key={template.id}
                  onClick={() => handleComponentClick(template)}
                  className={selectedComponent === template ? "selected" : ""}
                >
                  {selectedComponent === template ? (
                    <>
                      <td>
                        <input
                          type="text"
                          placeholder={template.name}
                          value={editedTemplateName}
                          onChange={handleTemplateNameChange}
                          className="css-comp-name-input"
                        />
                      </td>
                      <td>
                        <button onClick={handleSaveName} className="css-edit-icon" title="Save">
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="css-template-name">{renderTemplateName(template)}</td>
                      <td>
                        <button onClick={handleEditName} className="css-edit-icon" title="Edit">
                          ✏️
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="css-delete-icon"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {cssTemplates.filter((template) => template.userId === cssAuth.id).length === 0 &&
          renderNoComponentsMessage()}
      </div>
      <div className="css-template-componentandcode-div">
        {selectedComponent &&
          cssTemplates.map((template) =>
            template.id === selectedComponent.id ? (
              <div key={template.id}>
                <h4 className="css-proheader"> {template.name} </h4>
                <div className="css-boxesflex">
                  <div>
                    <h5>Component:</h5>
                    <div
                      className="css-profilecomppreview"
                      dangerouslySetInnerHTML={{
                        __html: cleanUpHTML(selectedComponent.htmlText),
                      }}
                    />
                  </div>
                  <div>
                    <h5>HTML and CSS:</h5>
                    <div className="css-profilehtmlpreview">
                      <pre>{selectedComponent.htmlText}</pre>
                    </div>
                    <button onClick={copyHtmlTextToClipboard} className="css-rainbowBtn">
                      Copy HTML
                    </button>
                    <div id="css-clipboard-message" className="css-copytoclip"></div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};

export default TemplateList;
