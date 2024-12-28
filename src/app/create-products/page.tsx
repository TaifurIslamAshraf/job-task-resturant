// components/ProductManagement.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@uploadthing/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OurFileRouter } from "../api/uploadthing/core";

type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: {
    _id: string;
    name: string;
  };
  count: number;
  isActive: boolean;
  order: number;
};

type Category = {
  _id: string;
  name: string;
};

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadKey, setUploadKey] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      category: "",
      count: 1,
      isActive: true,
      order: 0,
    },
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const onSubmit = async (values: unknown) => {
    setIsLoading(true);
    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save product");

      toast({
        title: "Success",
        description: `Product ${
          editingProduct ? "updated" : "created"
        } successfully`,
      });

      setOpenDialog(false);
      form.reset();
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category._id,
      count: product.count,
      isActive: product.isActive,
      order: product.order,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>

        <div className="border rounded-lg">
          <div className="border-b">
            <div className="grid grid-cols-7 p-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-[100px]" />
              ))}
            </div>
          </div>

          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 p-4 border-b">
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-[80%]" />
              ))}
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProduct(null);
                form.reset({
                  name: "",
                  price: 0,
                  image: "",
                  category: "",
                  count: 1,
                  isActive: true,
                  order: 0,
                });
              }}
            >
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Piece Count (PC)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {field.value && (
                              <div className="relative w-40 h-40 group">
                                <Image
                                  src={field.value}
                                  alt="Product"
                                  fill
                                  className="object-cover rounded-lg transition-opacity group-hover:opacity-75"
                                />
                                <button
                                  onClick={() => field.onChange("")}
                                  className="absolute hidden group-hover:flex items-center justify-center inset-0 bg-black/50 text-white rounded-lg"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                            <div className="mt-2">
                              <UploadButton<OurFileRouter, "imageUploader">
                                key={uploadKey}
                                endpoint="imageUploader"
                                appearance={{
                                  button: `bg-primary text-white px-4 py-2 rounded-md relative ${
                                    isUploading
                                      ? "opacity-50 cursor-not-allowed"
                                      : "hover:bg-primary/90"
                                  }`,
                                  container: "w-max",
                                }}
                                content={{
                                  button({ ready }) {
                                    if (isUploading) {
                                      return (
                                        <div className="flex items-center gap-2">
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                          Uploading...
                                        </div>
                                      );
                                    }
                                    return ready
                                      ? "Upload Image"
                                      : "Getting ready...";
                                  },
                                }}
                                onBeforeUploadBegin={(files) => {
                                  setIsUploading(true);
                                  setUploadKey((prev) => prev + 1);
                                  return files;
                                }}
                                onClientUploadComplete={(res) => {
                                  setIsUploading(false);
                                  if (res?.[0]?.url) {
                                    field.onChange(res[0].url);
                                    toast({
                                      title: "Success",
                                      description:
                                        "Image uploaded successfully",
                                    });
                                  }
                                }}
                                onUploadError={(error: Error) => {
                                  setIsUploading(false);
                                  toast({
                                    title: "Error",
                                    description: `Upload failed: ${error.message}`,
                                    variant: "destructive",
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel>Active</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>PC</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <div className="relative w-16 h-16">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.count}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    product.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
