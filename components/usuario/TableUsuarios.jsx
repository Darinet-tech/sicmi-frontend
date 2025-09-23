import React, { useState, useMemo } from "react";
import {
  Table,
  Row,
  Col,
  Tooltip,
  Modal,
  Button,
  Text,
  Grid,
  Pagination,
  Input,
  Dropdown,
} from "@nextui-org/react";
import { IconButton } from "../icons/IconButton";
import { EyeIcon } from "../icons/EyeIcon";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useRouter } from "next/router";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { StyledBadge } from "../StyledBadge";

const TableUsuarios = ({ usuarios }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [IdDelete, setIdDelete] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  
  
  // Estados para los filtros
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    cargo: "",
    role: "",
    unidadorganizativa: "",
    blocked: "",
  });

  // Configuración de paginación
  const rowsPerPage = 10;
  
  // Filtrar usuarios según los criterios
  const filteredUsers = useMemo(() => {
    return usuarios.filter(user => {
      // Asegurarse de que los valores no sean null o undefined
      const username = user.username || "";
      const email = user.email || "";
      const cargo = user.cargo || "";
      const roleName = user.role?.name || "";
      const uoNombre = user.unidadorganizativa?.nombre || "";
      
      return (
        username.toLowerCase().includes(filters.username.toLowerCase()) &&
        email.toLowerCase().includes(filters.email.toLowerCase()) &&
        cargo.toLowerCase().includes(filters.cargo.toLowerCase()) &&
        roleName.toLowerCase().includes(filters.role.toLowerCase()) &&
        uoNombre.toLowerCase().includes(filters.unidadorganizativa.toLowerCase()) &&
        (filters.blocked === "" || 
          (filters.blocked === "true" && user.blocked) || 
          (filters.blocked === "false" && !user.blocked))
      );
    });
  }, [usuarios, filters]);

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);
  
  // Obtener los usuarios para la página actual
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [currentPage, filteredUsers]);

  // Manejar cambios en los filtros
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Resetear a la primera página al filtrar
  };

  const handlerDelete = (pid) => {
    setIdDelete(pid);
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const handleSubmitDelete = async (e) => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${IdDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Eliminar Usuario
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b size={18}>
            Desea eliminar el registro de Usuario ?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Cancelar
          </Button>
          <Button auto onClick={handleSubmitDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Grid>
        <Row>
          <Text
            h1
            size={50}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            Listado de Usuarios
          </Text>
        </Row>
        
        {/* Información de filtrado */}
        <Row css={{ marginBottom: "20px" }}>
          <Text size={14}>
            Mostrando {filteredUsers.length} de {usuarios.length} usuarios
            {Object.values(filters).some(f => f !== "") && " (filtrados)"}
          </Text>
        </Row>

        {/* Filtros fuera de la tabla */}
        <Row gap={1} css={{mb: 10}}>
          <Col>
            
            <Input
              clearable
              bordered
              size="sm"
              placeholder="Filtrar..."
              value={filters.username}
              onChange={(e) => handleFilterChange("username", e.target.value)}
            />
          </Col>
          <Col>
            
            <Input
              clearable
              bordered
              size="sm"
              placeholder="Filtrar..."
              value={filters.email}
              onChange={(e) => handleFilterChange("email", e.target.value)}
            />
          </Col>
          <Col>
            
            <Input
              clearable
              bordered
              size="sm"
              placeholder="Filtrar..."
              value={filters.cargo}
              onChange={(e) => handleFilterChange("cargo", e.target.value)}
            />
          </Col>
          <Col>
            
            <Input
              clearable
              bordered
              size="sm"
              placeholder="Filtrar..."
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
            />
          </Col>
          <Col>
            
            <Input
              clearable
              bordered
              size="sm"
              placeholder="Filtrar..."
              value={filters.unidadorganizativa}
              onChange={(e) => handleFilterChange("unidadorganizativa", e.target.value)}
            />
          </Col>
          <Col>
            
            <Dropdown>
              <Dropdown.Button 
              flat
              size="sm"
              css={{ 
                  width: "100%",
                  
                  maxWidth: "100%",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "$text",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                  }
                }}>
                {filters.blocked === "" ? "Todos" : filters.blocked === "true" ? "Sí" : "No"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Filtrar por bloqueado"
                selectionMode="single"
                selectedKeys={[filters.blocked]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys).join("");
                  handleFilterChange("blocked", selected);
                }}
                
              >
                <Dropdown.Item key="">Todos</Dropdown.Item>
                <Dropdown.Item key="true">Bloqueados</Dropdown.Item>
                <Dropdown.Item key="false">Activos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        
        <Row>
          <Table
            aria-label="Listado de Usuarios"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column css={{ textAlign: "center" }}>USUARIO</Table.Column>
              <Table.Column css={{ textAlign: "center" }}>CORREO</Table.Column>
              <Table.Column css={{ textAlign: "center" }}>CARGO</Table.Column>
              <Table.Column css={{ textAlign: "center" }}>ROL</Table.Column>
              <Table.Column css={{ textAlign: "center" }}>UNIDAD ORGANIZATIVA</Table.Column>
              <Table.Column css={{ textAlign: "center" }}>BLOQUEADO</Table.Column>
              <Table.Column css={{ textAlign: "center" }}>ACCIONES</Table.Column>
            </Table.Header>
            <Table.Body>
              {paginatedUsers.map((userItem) => (
                <Table.Row key={userItem.id}>
                  <Table.Cell>
                    <Text b size={14}>
                      {userItem.username || ""}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {userItem.email || ""}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {userItem.cargo || ""}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {userItem.role ? userItem.role.name : ""}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {userItem.unidadorganizativa
                        ? userItem.unidadorganizativa.nombre
                        : ""}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <StyledBadge
                      type={userItem.blocked ? "Bloqueado" : "Activo"}
                    >
                      {userItem.blocked ? "Bloqueado" : "Activo"}
                    </StyledBadge>
                  </Table.Cell>
                  <Table.Cell>
                    <Row justify="center" align="center">
                      <Col css={{ d: "flex" }}>
                        <Tooltip content="Detalles" color="primary">
                          <IconButton onClick={() => {}}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                        </Tooltip>
                      </Col>
                      <Col css={{ d: "flex" }}>
                        <Tooltip content="Editar Usuario" color="success">
                          <IconButton
                            onClick={() => {
                              router.push(
                                `/admin/usuarios/edit/${userItem.id}`
                              );
                            }}
                          >
                            <EditIcon size={20} fill="#00ff00" />
                          </IconButton>
                        </Tooltip>
                      </Col>
                      <Col css={{ d: "flex" }}>
                        <Tooltip
                          content="Eliminar Usuario"
                          color="error"
                          onClick={() => {
                            handlerDelete(userItem.id);
                          }}
                        >
                          <IconButton>
                            <DeleteIcon size={20} fill="#FF0080" />
                          </IconButton>
                        </Tooltip>
                      </Col>
                    </Row>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Row>
        
        {/* Paginación */}
        <Row justify="center" css={{marginTop: "20px"}}>
          <Pagination
            total={pages}
            initialPage={1}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </Row>
        
        {/* Información de paginación */}
        <Row justify="center">
          <Text size={14} css={{marginTop: "10px"}}>
            Mostrando {paginatedUsers.length} de {filteredUsers.length} usuarios
          </Text>
        </Row>
      </Grid>
    </>
  );
};

export default TableUsuarios;
