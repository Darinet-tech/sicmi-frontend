import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { IconButton } from "./icons/IconButton";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

export const TablaUsuario = () => {
  const columns = [
    { name: "NOMBRE", uid: "nombre" },
    { name: "EMAIL", uid: "email" },
    { name: "PASSWORD", uid: "password" },
    { name: "CARGO", uid: "cargo" },
    { name: "ROLE", uid: "role" },    
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = [
    {
      id: 1,
      nombre: "Darinet Martínez Corteguera",
      email: "darinet.corteguera@etecsa.cu",
      password: "12345",
      cargo: "Jefe de Grupo",
      role: "Administrador",
      avatar: "",
    },
    {
      id: 2,
      nombre: "Denis Blanco Naranjo",
      email: "denis.blanco@etecsa.cu",
      password: "1234",
      cargo: "Technical Lead",
      role: "Especialista",      
      avatar: "",
    },
    {
      id: 3,
      nombre: "Irán López Cárdenas",
      email: "iran.lopez@etecsa.cu",
      password: "123",
      cargo: "Development",
      role: "Supervisor",      
      avatar: "",
    },
  ];
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "nombre":
        return (
          <User            
            bordered color="primary"
            src={user.avatar}
            css={{ p: 0 }}>
            <Text b size={14} css={{ tt: "capitalize", color: "white" }}>
              {cellValue}
            </Text>
          </User>
        );
      case "email":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ color: "white" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "password":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ color: "white" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "cargo":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ color: "white" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ color: "white" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", user.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editar usuario" color="primary">
                <IconButton
                  onClick={() => console.log("Editar usuario", user.id)}
                >
                  <EditIcon size={20} fill="green" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Eliminar usuario"
                color="error"
                onClick={() => console.log("Eliminar usuario", user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="red" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        width: "100%",
        
      }}

      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={users}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
