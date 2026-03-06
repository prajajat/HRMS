import React, { useState, useEffect } from 'react';
import { useGetSystemConfig, useUpdateSystemConfig, useUpdateSystemConfigWithDocument } from '../../Query/useQueries';
import styles from '../../Styles/systemConfig.module.css';

export const SystemConfig: React.FC = () => {
  const [configs, setConfigs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [originalValue, setOriginalValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: systemConfigs = [], isLoading, error, refetch } = useGetSystemConfig();
  const { mutate: updateConfig, isPending: isUpdating } = useUpdateSystemConfig();
  const { mutate: updateConfigWithDocument, isPending: isUploadingDocument } = useUpdateSystemConfigWithDocument();

  const documentConfigKeys = ['birthday_post_document_id', 'anniversary_post_document_id'];

  useEffect(() => {
    if (systemConfigs && Array.isArray(systemConfigs)) {
      console.log('Setting configs:', systemConfigs);
      setConfigs(systemConfigs);
    }
  }, [systemConfigs]);

  const filteredConfigs = configs.filter(config =>
    config.configKey?.toLowerCase().includes(searchText.toLowerCase()) ||
    config.configValue?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (config: any) => {
    setEditingId(config.configKey);
    setEditValue(config.configValue || '');
    setOriginalValue(config.configValue || '');
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
    setOriginalValue('');
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSave = (configKey: string) => {
    // If a file is selected for document configs, upload it
    if (documentConfigKeys.includes(configKey) && selectedFile) {
      updateConfigWithDocument(
        { configKey, file: selectedFile },
        {
          onSuccess: () => {
            console.log(`Config ${configKey} updated with document successfully`);
            refetch();
            handleCancel();
          },
          onError: (error) => {
            console.error('Error updating config with document:', error);
            alert('Failed to update configuration with document');
          }
        }
      );
    } else if (editValue === originalValue && !selectedFile) {
      handleCancel();
      return;
    } else if (!documentConfigKeys.includes(configKey)) {
      // Regular config update (not a document)
      updateConfig(
        {
          configKey,
          configValue: editValue
        },
        {
          onSuccess: () => {
            console.log(`Config ${configKey} updated successfully`);
            refetch();
            handleCancel();
          },
          onError: (error) => {
            console.error('Error updating config:', error);
            alert('Failed to update configuration');
          }
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading system configurations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error loading system configurations</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>System Configuration</h1>
        <p>Manage system-wide configuration settings</p>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search configuration..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.configTable}>
          <thead>
            <tr>
              <th>Configuration Key</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredConfigs.length === 0 ? (
              <tr>
                <td colSpan={3} className={styles.noData}>
                  No configurations found
                </td>
              </tr>
            ) : (
              filteredConfigs.map((config) => (
                <tr key={config.configKey}>
                  <td className={styles.keyCell}>
                    <code>{config.configKey}</code>
                  </td>
                  <td className={styles.valueCell}>
                    {editingId === config.configKey ? (
                      <div>
                        {documentConfigKeys.includes(config.configKey) ? (
                          <div className={styles.fileUploadContainer}>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              disabled={isUploadingDocument}
                              className={styles.fileInput}
                            />
                            {selectedFile && (
                              <div className={styles.selectedFile}>
                                Selected: {selectedFile.name}
                              </div>
                            )}
                          </div>
                        ) : (
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className={styles.editInput}
                            rows={editValue.split('\n').length > 1 ? 3 : 1}
                            disabled={isUpdating || isUploadingDocument}
                          />
                        )}
                      </div>
                    ) : (
                      <div>
                        {documentConfigKeys.includes(config.configKey) && config.configValue ? (
                          <div className={styles.imagePreview}>
                            <img 
                              src={config.configValue} 
                              alt={config.configKey}
                              className={styles.previewImage}
                            />
                            <p className={styles.imageUrl}>{config.configValue}</p>
                          </div>
                        ) : (
                          <span className={styles.valueText}>{config.configValue || '(empty)'}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className={styles.actionsCell}>
                    {editingId === config.configKey ? (
                      <div className={styles.actionButtons}>
                        <button
                          onClick={() => handleSave(config.configKey)}
                          disabled={isUpdating || isUploadingDocument || (documentConfigKeys.includes(config.configKey) && !selectedFile)}
                          className={styles.saveBtn}
                        >
                          {isUpdating || isUploadingDocument ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={isUpdating || isUploadingDocument}
                          className={styles.cancelBtn}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(config)}
                        className={styles.editBtn}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <p>Total Configurations: <strong>{filteredConfigs.length}</strong></p>
      </div>
    </div>
  );
};

export default SystemConfig;
