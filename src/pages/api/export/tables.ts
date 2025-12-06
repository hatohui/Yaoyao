import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/common/prisma";
import * as XLSX from "xlsx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Fetch all tables with their layout, people, and orders
    const tables = await prisma.table.findMany({
      where: {
        isStaging: false, // Only export non-staging tables
      },
      include: {
        layout: true,
        people: true,
        orders: {
          include: {
            food: {
              include: {
                variants: true,
              },
            },
            variant: true,
          },
        },
      },
      orderBy: [
        {
          layout: {
            id: "asc",
          },
        },
        {
          name: "asc",
        },
      ],
    });

    // Transform data for Excel export - tables as columns
    const workbook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = {};

    // Color palette for alternating tables
    const colors = [
      "FFE3F2FD", // Light Blue
      "FFF3E5F5", // Light Purple
      "FFFCE4EC", // Light Pink
      "FFF1F8E9", // Light Green
      "FFFFF3E0", // Light Orange
      "FFE0F7FA", // Light Cyan
    ];

    const columnLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const getColumnLetter = (index: number): string => {
      if (index < 26) return columnLetters[index];
      return (
        columnLetters[Math.floor(index / 26) - 1] + columnLetters[index % 26]
      );
    };

    let currentCol = 0;
    const maxRows: number[] = [];

    tables.forEach((table, tableIndex) => {
      const colLetter = getColumnLetter(currentCol);
      const bgColor = colors[tableIndex % colors.length];

      // Group orders by food item and variant
      const orderMap: Array<{
        foodName: string;
        variant: string;
        quantity: number;
      }> = [];

      table.orders.forEach((order) => {
        const foodName = order.food.name;
        const variantLabel = order.variant?.label || "";

        const existing = orderMap.find(
          (o) => o.foodName === foodName && o.variant === variantLabel
        );

        if (existing) {
          existing.quantity += order.quantity;
        } else {
          orderMap.push({
            foodName,
            variant: variantLabel,
            quantity: order.quantity,
          });
        }
      });

      // Row 1: Table Name
      worksheet[`${colLetter}1`] = {
        v: table.name,
        t: "s",
        s: {
          fill: { fgColor: { rgb: bgColor } },
          font: { bold: true, sz: 12 },
          alignment: { vertical: "center", horizontal: "center" },
          border: {
            top: { style: "medium", color: { rgb: "FF000000" } },
            bottom: { style: "thin", color: { rgb: "FFD0D0D0" } },
            left: { style: "medium", color: { rgb: "FF000000" } },
            right: { style: "medium", color: { rgb: "FF000000" } },
          },
        },
      };

      // Row 2: Table Number
      worksheet[`${colLetter}2`] = {
        v: `Table #${table.layout?.id || "N/A"}`,
        t: "s",
        s: {
          fill: { fgColor: { rgb: bgColor } },
          font: { bold: true },
          alignment: { vertical: "center", horizontal: "center" },
          border: {
            top: { style: "thin", color: { rgb: "FFD0D0D0" } },
            bottom: { style: "thin", color: { rgb: "FFD0D0D0" } },
            left: { style: "medium", color: { rgb: "FF000000" } },
            right: { style: "medium", color: { rgb: "FF000000" } },
          },
        },
      };

      // Row 3: Number of People
      worksheet[`${colLetter}3`] = {
        v: `${table.people.length} ${
          table.people.length === 1 ? "person" : "people"
        }`,
        t: "s",
        s: {
          fill: { fgColor: { rgb: bgColor } },
          alignment: { vertical: "center", horizontal: "center" },
          border: {
            top: { style: "thin", color: { rgb: "FFD0D0D0" } },
            bottom: { style: "medium", color: { rgb: "FF000000" } },
            left: { style: "medium", color: { rgb: "FF000000" } },
            right: { style: "medium", color: { rgb: "FF000000" } },
          },
        },
      };

      // Row 4: Headers
      worksheet[`${colLetter}4`] = {
        v: "Food Item",
        t: "s",
        s: {
          fill: { fgColor: { rgb: "FF4A5568" } },
          font: { bold: true, color: { rgb: "FFFFFFFF" } },
          alignment: { vertical: "center", horizontal: "center" },
          border: {
            top: { style: "medium", color: { rgb: "FF000000" } },
            bottom: { style: "thin", color: { rgb: "FF000000" } },
            left: { style: "medium", color: { rgb: "FF000000" } },
            right: { style: "medium", color: { rgb: "FF000000" } },
          },
        },
      };

      const nextColLetter = getColumnLetter(currentCol + 1);
      worksheet[`${nextColLetter}4`] = {
        v: "Size",
        t: "s",
        s: {
          fill: { fgColor: { rgb: "FF4A5568" } },
          font: { bold: true, color: { rgb: "FFFFFFFF" } },
          alignment: { vertical: "center", horizontal: "center" },
          border: {
            top: { style: "medium", color: { rgb: "FF000000" } },
            bottom: { style: "thin", color: { rgb: "FF000000" } },
            left: { style: "medium", color: { rgb: "FF000000" } },
            right: { style: "thin", color: { rgb: "FFD0D0D0" } },
          },
        },
      };

      const qtyColLetter = getColumnLetter(currentCol + 2);
      worksheet[`${qtyColLetter}4`] = {
        v: "Qty",
        t: "s",
        s: {
          fill: { fgColor: { rgb: "FF4A5568" } },
          font: { bold: true, color: { rgb: "FFFFFFFF" } },
          alignment: { vertical: "center", horizontal: "center" },
          border: {
            top: { style: "medium", color: { rgb: "FF000000" } },
            bottom: { style: "thin", color: { rgb: "FF000000" } },
            left: { style: "thin", color: { rgb: "FFD0D0D0" } },
            right: { style: "medium", color: { rgb: "FF000000" } },
          },
        },
      };

      // Data rows (starting from row 5)
      let rowNum = 5;
      if (orderMap.length === 0) {
        worksheet[`${colLetter}${rowNum}`] = {
          v: "No orders",
          t: "s",
          s: {
            fill: { fgColor: { rgb: bgColor } },
            alignment: { vertical: "center", horizontal: "center" },
            border: {
              top: { style: "thin", color: { rgb: "FFD0D0D0" } },
              bottom: { style: "medium", color: { rgb: "FF000000" } },
              left: { style: "medium", color: { rgb: "FF000000" } },
              right: { style: "medium", color: { rgb: "FF000000" } },
            },
          },
        };
        // Merge cells for "No orders"
        if (!worksheet["!merges"]) worksheet["!merges"] = [];
        worksheet["!merges"].push({
          s: { r: rowNum - 1, c: currentCol },
          e: { r: rowNum - 1, c: currentCol + 2 },
        });
        rowNum++;
      } else {
        orderMap.forEach((order) => {
          // Food Item
          worksheet[`${colLetter}${rowNum}`] = {
            v: order.foodName,
            t: "s",
            s: {
              fill: { fgColor: { rgb: bgColor } },
              alignment: { vertical: "center", horizontal: "left" },
              border: {
                top: { style: "thin", color: { rgb: "FFD0D0D0" } },
                bottom: { style: "thin", color: { rgb: "FFD0D0D0" } },
                left: { style: "medium", color: { rgb: "FF000000" } },
                right: { style: "medium", color: { rgb: "FF000000" } },
              },
            },
          };

          // Size
          worksheet[`${nextColLetter}${rowNum}`] = {
            v: order.variant || "-",
            t: "s",
            s: {
              fill: { fgColor: { rgb: bgColor } },
              alignment: { vertical: "center", horizontal: "center" },
              border: {
                top: { style: "thin", color: { rgb: "FFD0D0D0" } },
                bottom: { style: "thin", color: { rgb: "FFD0D0D0" } },
                left: { style: "medium", color: { rgb: "FF000000" } },
                right: { style: "thin", color: { rgb: "FFD0D0D0" } },
              },
            },
          };

          // Quantity
          worksheet[`${qtyColLetter}${rowNum}`] = {
            v: order.quantity,
            t: "n",
            s: {
              fill: { fgColor: { rgb: bgColor } },
              alignment: { vertical: "center", horizontal: "center" },
              border: {
                top: { style: "thin", color: { rgb: "FFD0D0D0" } },
                bottom: { style: "thin", color: { rgb: "FFD0D0D0" } },
                left: { style: "thin", color: { rgb: "FFD0D0D0" } },
                right: { style: "medium", color: { rgb: "FF000000" } },
              },
            },
          };

          rowNum++;
        });

        // Add bottom border to last row
        const lastRow = rowNum - 1;
        [colLetter, nextColLetter, qtyColLetter].forEach((col) => {
          if (
            worksheet[`${col}${lastRow}`] &&
            worksheet[`${col}${lastRow}`].s
          ) {
            worksheet[`${col}${lastRow}`].s.border.bottom = {
              style: "medium",
              color: { rgb: "FF000000" },
            };
          }
        });
      }

      maxRows.push(rowNum);
      currentCol += 3; // Move 3 columns for next table (Food, Size, Qty)
    });

    // Set worksheet range
    const maxRow = Math.max(...maxRows, 5);
    const maxCol = currentCol - 1;
    worksheet["!ref"] = `A1:${getColumnLetter(maxCol)}${maxRow}`;

    // Set column widths
    const colWidths = [];
    for (let i = 0; i <= maxCol; i++) {
      const mod = i % 3;
      if (mod === 0) colWidths.push({ wch: 30 }); // Food Item
      else if (mod === 1) colWidths.push({ wch: 15 }); // Size
      else colWidths.push({ wch: 8 }); // Quantity
    }
    worksheet["!cols"] = colWidths;

    // Set row heights
    worksheet["!rows"] = [
      { hpt: 30 }, // Row 1: Table Name
      { hpt: 22 }, // Row 2: Table Number
      { hpt: 22 }, // Row 3: People
      { hpt: 25 }, // Row 4: Headers
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Tables Export");

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Set headers
    const timestamp = new Date().toISOString().split("T")[0];
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="tables-export-${timestamp}.xlsx"`
    );

    // Send the file
    res.send(buffer);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ message: "Failed to export data" });
  }
}
